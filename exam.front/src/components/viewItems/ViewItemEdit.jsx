import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { getViewItem, editViewItem } from '../service/viewItem.service';

const viewItemValidationSchema = Yup.object().shape({
  title: Yup.string().required('View Item title is required'),
});

function ViewItemEdit() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [viewItem, setViewItem] = useState([]);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchViewItem = async (id) => {
      try {
        const fetchedViewItem = await getViewItem(id);
        setViewItem(fetchedViewItem);
      } catch (error) {
        console.log(error);
        setShowError(true);
        setErrorMessage('Error fetching menu');
      }
    };
    if(id !== undefined) {
        fetchViewItem(id);
    }
  }, [id]);
  
  const handleViewItemUpdate = async (values, {resetForm}) => {
    try {
      await editViewItem(values.title); 
      resetForm();
      navigate('/viewItems');
    } catch (error) {
      console.log(error);
      setShowError(true);
      setErrorMessage('Error creating viewItem');
    }
  };

  return (
    <Container className="form-style">
      <Row>
        <h3>Edit ViewItem</h3>
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
            title: viewItem.title,
          }}
          validationSchema={viewItemValidationSchema}
          onSubmit={(values, { resetForm }) => {
            handleViewItemUpdate(values, { resetForm });
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
                    Edit ViewItem
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

export default ViewItemEdit;
