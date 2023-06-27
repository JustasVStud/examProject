import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import { createEmployee } from '../service/autoService.service';

const employeeValidationSchema = Yup.object().shape({
  title: Yup.string().required('View Item title is required'),
});

function EmployeeCreation() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);

  const handleEmployeeCreation = async (values, {resetForm}) => {
    try {
            await createEmployee(values); 
      resetForm();
      navigate(`/autoServices`);
    } catch (error) {
      console.log(error);
      setShowError(true);
      setErrorMessage('Error creating employee');
    }
  };

  return (
    <Container className="form-style">
      <Row>
        <h3>Create Employee</h3>
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
            title: '',
          }}
          validationSchema={employeeValidationSchema}
          onSubmit={(values, { resetForm }) => {
            handleEmployeeCreation(values, { resetForm });
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
              <Row className="form-buttons-container">
                <Col>
                  <Button variant="primary" type="submit" disabled={!dirty}>
                    Create Employee
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

export default EmployeeCreation;