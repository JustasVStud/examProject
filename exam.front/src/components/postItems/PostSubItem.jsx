import { Link } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { deletePostSubItem } from '../service/postItem.service';
function PostSubItem({postSubItem, postItemId, postSubItemId, onDelete}) {

    const handlePostSubItemDelete = async () => {
      try {
        await deletePostSubItem(postItemId, postSubItemId);
        onDelete();
      } catch (error) {
        console.log(error);
      }
    };

    return ( 
        <Card>
            <Card.Body>
                <Row>
                <Col>
                    {postSubItem.title}
                </Col>
                <Col>
                    <Link to={`/postItems/${postItemId}/postSubItems/${postSubItemId}`}>Edit post sub item</Link>
                </Col>
                <Col><Button onClick={handlePostSubItemDelete}>Delete post sub item</Button></Col>

                </Row>
            </Card.Body>
        </Card>
    );
}

export default PostSubItem;