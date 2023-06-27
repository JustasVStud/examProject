import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { getEmployee, editEmployee } from '../service/autoService.service';

const employeeValidationSchema = Yup.object().shape({
  title: Yup.string().required('View Item title is required'),
});

function EmployeeEdit() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [employee, setEmployee] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    const fetchEmployee = async ( id) => {
      try {
        const fetchedEmployee = await getEmployee(id);
        setEmployee(fetchedEmployee);
      } catch (error) {
        console.log(error);
        setShowError(true);
        setErrorMessage('Error fetching menu');
      }
    };
    if(id !== undefined) {
        fetchEmployee(id);
    }
  }, [id]);

  const handleEmployeeUpdate = async (values, {resetForm}) => {
    try {
      if(id !== undefined){
        await editEmployee( values.title); 
    }
      resetForm();
      navigate(`/autoServices/`);
    } catch (error) {
      console.log(error);
      setShowError(true);
      setErrorMessage('Error creating employee');
    }
  };

  return (
    <Container className="form-style">
      <Row>
        <h3>Edit Employee</h3>
      </Row>
      {showError && (
        <Row>
          <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
            {errorMessage}
          </Alert>
        </Row>
      )}
      <Row>
        <Formik
          initialValues={{
            title: employee.title,
          }}
          validationSchema={employeeValidationSchema}
          onSubmit={(values, { resetForm }) => {
            handleEmployeeUpdate(values, { resetForm });
          }}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            dirty,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  size="sm"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.title && !!errors.title}
                />
                <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
              </Form.Group>
              <Row className="form-buttons-container">
                <Col>
                  <Button variant="primary" type="submit" disabled={!dirty}>
                    Edit Employee
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Row>
    </Container>
  );
}

export default EmployeeEdit;
