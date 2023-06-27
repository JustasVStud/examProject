import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { getEmployee, editEmployee, getAutoServices } from '../service/autoService.service';

const employeeValidationSchema = Yup.object().shape({
  name: Yup.string().required('Employee name is required'),
  surname: Yup.string().required('Employee surname is required'),
  specialty: Yup.string().required('Employee specialty is required'),
  city: Yup.string().required('Employee city is required'),
  autoServiceId: Yup.string().required('Employee place of work is required'),
});

function EmployeeEdit() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [autoServices, setAutoServices] = useState([]);
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
  useEffect(() => {
    const fetchAutoServices = async () => {
      try {
        const autoServicesData = await getAutoServices();
        setAutoServices(autoServicesData);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchAutoServices();
  }, []);

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
            name: employee.name,
            surname: employee.surname,
            specialty: employee.specialty,
            city: employee.specialty,
            autoServiceId: employee.autoServiceId
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
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  size="sm"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.name && !!errors.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Surname</Form.Label>
                <Form.Control
                  type="text"
                  name="surname"
                  size="sm"
                  value={values.surname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.surname && !!errors.surname}
                />
                <Form.Control.Feedback type="invalid">{errors.surname}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Speacialty</Form.Label>
                <Form.Control
                  type="text"
                  name="specialty"
                  size="sm"
                  value={values.specialty}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.specialty && !!errors.specialty}
                />
                <Form.Control.Feedback type="invalid">{errors.specialty}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  size="sm"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.city && !!errors.city}
                />
                <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Auto Service</Form.Label>
                <Form.Control
                  as="select"
                  name="autoServiceId"
                  size="sm"
                  value={values.autoServiceId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.autoServiceId && !!errors.autoServiceId}
                >
                  <option value="">Select auto service</option>

                  {autoServices.map((autoService) => (
                    <option
                      key={autoService.id}
                      value={autoService.id}
                    >
                      {autoService.title}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.autoServiceId}</Form.Control.Feedback>
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
