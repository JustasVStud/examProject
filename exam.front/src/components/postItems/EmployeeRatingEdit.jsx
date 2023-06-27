import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { getPostItem, editPostItem } from '../service/postItem.service';

const postItemValidationSchema = Yup.object().shape({
  title: Yup.string().required('Post Item title is required'),
});

function PostItemEdit() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [postItem, setPostItem] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchPostItem = async (id) => {
      try {
        const fetchedPostItem = await getPostItem(id);
        setPostItem(fetchedPostItem);
      } catch (error) {
        console.log(error);
        setShowError(true);
        setErrorMessage('Error fetching menu');
      }
    };
    if(id !== undefined) {
        fetchPostItem(id);
    }
  }, [id]);
  
  const handlePostItemUpdate = async (values, {resetForm}) => {
    try {
      await editPostItem(values.title); 
      resetForm();
      navigate('/postItems');
    } catch (error) {
      console.log(error);
      setShowError(true);
      setErrorMessage('Error creating postItem');
    }
  };

  return (
    <Container className="form-style">
      <Row>
        <h3>Edit PostItem</h3>
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
            title: postItem.title,
          }}
          validationSchema={postItemValidationSchema}
          onSubmit={(values, { resetForm }) => {
            handlePostItemUpdate(values, { resetForm });
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
                    Edit PostItem
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

export default PostItemEdit;
