import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { getPostSubItem, editPostSubItem } from '../service/postItem.service';

const postSubItemValidationSchema = Yup.object().shape({
  title: Yup.string().required('Post Item title is required'),
});

function PostSubItemEdit() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [postSubItem, setPostSubItem] = useState([]);
  const { postItemId, id } = useParams();

  useEffect(() => {
    const fetchPostSubItem = async (postItemId, id) => {
      try {
        const fetchedPostSubItem = await getPostSubItem(postItemId, id);
        setPostSubItem(fetchedPostSubItem);
      } catch (error) {
        console.log(error);
        setShowError(true);
        setErrorMessage('Error fetching menu');
      }
    };
    if( postItemId!== undefined && id !== undefined) {
        fetchPostSubItem(id);
    }
  }, [postItemId, id]);
  
  const handlePostSubItemUpdate = async (values, {resetForm}) => {
    try {
      if(postItemId !== undefined && id !== undefined){
        await editPostSubItem(postItemId, values.title); 
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
        <h3>Edit PostSubItem</h3>
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
            title: postSubItem.title,
          }}
          validationSchema={postSubItemValidationSchema}
          onSubmit={(values, { resetForm }) => {
            handlePostSubItemUpdate(values, { resetForm });
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
                    Edit PostSubItem
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

export default PostSubItemEdit;
