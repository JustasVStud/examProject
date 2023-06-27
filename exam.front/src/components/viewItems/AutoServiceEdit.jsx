import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { getAutoService, editAutoService } from '../service/autoService.service';

const autoServiceValidationSchema = Yup.object().shape({
  title: Yup.string().required('View Item title is required'),
});

function AutoServiceEdit() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [autoService, setAutoService] = useState([]);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchAutoService = async (id) => {
      try {
        const fetchedAutoService = await getAutoService(id);
        setAutoService(fetchedAutoService);
      } catch (error) {
        console.log(error);
        setShowError(true);
        setErrorMessage('Error fetching menu');
      }
    };
    if(id !== undefined) {
        fetchAutoService(id);
    }
  }, [id]);
  
  const handleAutoServiceUpdate = async (values, {resetForm}) => {
    try {
      await editAutoService(values.title); 
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
        <h3>Edit AutoService</h3>
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
            title: autoService.title,
          }}
          validationSchema={autoServiceValidationSchema}
          onSubmit={(values, { resetForm }) => {
            handleAutoServiceUpdate(values, { resetForm });
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
                    Edit AutoService
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

export default AutoServiceEdit;
