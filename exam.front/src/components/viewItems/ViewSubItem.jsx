import { Link } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { deleteViewSubItem } from '../service/viewItem.service';
function ViewSubItem({viewSubItem, viewItemId, viewSubItemId, onDelete}) {

    const handleViewSubItemDelete = async () => {
      try {
        await deleteViewSubItem(viewItemId, viewSubItemId);
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
                    {viewSubItem.title}
                </Col>
                <Col>
                    <Link to={`/viewItems/${viewItemId}/viewSubItems/${viewSubItemId}`}>Edit view sub item</Link>
                </Col>
                <Col><Button onClick={handleViewSubItemDelete}>Delete view sub item</Button></Col>

                </Row>
            </Card.Body>
        </Card>
    );
}

export default ViewSubItem;