import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { getViewSubItem, editViewSubItem } from '../service/viewItem.service';

const viewSubItemValidationSchema = Yup.object().shape({
  title: Yup.string().required('View Item title is required'),
});

function ViewSubItemEdit() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [viewSubItem, setViewSubItem] = useState([]);
  const { viewItemId, id } = useParams();

  useEffect(() => {
    const fetchViewSubItem = async (viewItemId, id) => {
      try {
        const fetchedViewSubItem = await getViewSubItem(viewItemId, id);
        setViewSubItem(fetchedViewSubItem);
      } catch (error) {
        console.log(error);
        setShowError(true);
        setErrorMessage('Error fetching menu');
      }
    };
    if( viewItemId!== undefined && id !== undefined) {
        fetchViewSubItem(id);
    }
  }, [viewItemId, id]);
  
  const handleViewSubItemUpdate = async (values, {resetForm}) => {
    try {
      if(viewItemId !== undefined && id !== undefined){
        await editViewSubItem(viewItemId, values.title); 
    }
      resetForm();
      navigate(`/viewItems/${viewItemId}`);
    } catch (error) {
      console.log(error);
      setShowError(true);
      setErrorMessage('Error creating viewSubItem');
    }
  };

  return (
    <Container className="form-style">
      <Row>
        <h3>Edit ViewSubItem</h3>
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
            title: viewSubItem.title,
          }}
          validationSchema={viewSubItemValidationSchema}
          onSubmit={(values, { resetForm }) => {
            handleViewSubItemUpdate(values, { resetForm });
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
                    Edit ViewSubItem
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

export default ViewSubItemEdit;
