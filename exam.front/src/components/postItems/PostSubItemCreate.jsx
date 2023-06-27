import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { createPostSubItem } from '../service/postItem.service';

const postSubItemValidationSchema = Yup.object().shape({
  title: Yup.string().required('Post Item title is required'),
});

function PostSubItemCreation() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const {postItemId} = useParams();

  const handlePostSubItemCreation = async (values, {resetForm}) => {
    try {
        if(postItemId !== undefined){
            await createPostSubItem(postItemId, values.title); 
        }
      resetForm();
      navigate(`/postItems/${postItemId}`);
    } catch (error) {
      console.log(error);
      setShowError(true);
      setErrorMessage('Error creating postSubItem');
    }
  };

  return (
    <Container className="form-style">
      <Row>
        <h3>Create PostSubItem</h3>
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
          validationSchema={postSubItemValidationSchema}
          onSubmit={(values, { resetForm }) => {
            handlePostSubItemCreation(values, { resetForm });
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
                    Create PostSubItem
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

export default PostSubItemCreation;
