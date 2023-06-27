import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { getEmployeeRating, editEmployeeRating } from '../service/employeeRating.service';

const employeeRatingValidationSchema = Yup.object().shape({
  title: Yup.string().required('Post Item title is required'),
});

function EmployeeRatingEdit() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [employeeRating, setEmployeeRating] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployeeRating = async (id) => {
      try {
        const fetchedEmployeeRating = await getEmployeeRating(id);
        setEmployeeRating(fetchedEmployeeRating);
      } catch (error) {
        console.log(error);
        setShowError(true);
        setErrorMessage('Error fetching menu');
      }
    };
    if(id !== undefined) {
        fetchEmployeeRating(id);
    }
  }, [id]);
  
  const handleEmployeeRatingUpdate = async (values, {resetForm}) => {
    try {
      await editEmployeeRating(values.title); 
      resetForm();
      navigate('/employeeRatings');
    } catch (error) {
      console.log(error);
      setShowError(true);
      setErrorMessage('Error creating employeeRating');
    }
  };

  return (
    <Container className="form-style">
      <Row>
        <h3>Edit EmployeeRating</h3>
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
            title: employeeRating.title,
          }}
          validationSchema={employeeRatingValidationSchema}
          onSubmit={(values, { resetForm }) => {
            handleEmployeeRatingUpdate(values, { resetForm });
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
                    Edit EmployeeRating
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

export default EmployeeRatingEdit;
