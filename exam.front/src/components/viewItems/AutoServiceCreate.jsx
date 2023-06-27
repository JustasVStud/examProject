import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { createAutoService } from '../service/autoService.service';

const autoServiceValidationSchema = Yup.object().shape({
  title: Yup.string().required('Auto service must have a name'),
  adress: Yup.string().required('Auto service must have an adress'),
  director: Yup.string().required('Auto service must have a director'),

});

function AutoServiceCreate() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);

  const handleAutoServiceCreation = async (values, {resetForm}) => {
    try {
      await createAutoService(values.title); 
      resetForm();
      navigate('/autoServices');
    } catch (error) {
      console.log(error);
      setShowError(true);
      setErrorMessage('Error creating autoService');
    }
  };

  return (
    <Container className="form-style">
      <Row>
        <h3>Create AutoService</h3>
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
            address: '',
            director: ''
          }}
          validationSchema={autoServiceValidationSchema}
          onSubmit={(values, { resetForm }) => {
            handleAutoServiceCreation(values, { resetForm });
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
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  size="sm"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.address && !!errors.address}
                />
                <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Director</Form.Label>
                <Form.Control
                  type="text"
                  name="director"
                  size="sm"
                  value={values.director}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.director && !!errors.director}
                />
                <Form.Control.Feedback type="invalid">{errors.director}</Form.Control.Feedback>
              </Form.Group>
              <Row className="form-buttons-container">
                <Col>
                  <Button variant="primary" type="submit" disabled={!dirty}>
                    Create AutoService
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

export default AutoServiceCreate;
