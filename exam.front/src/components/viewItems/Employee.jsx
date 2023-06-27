import { Link } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { deleteViewSubItem } from '../service/autoService.service';
function ViewSubItem({employee, autoServiceId, employeeId, onDelete}) {

    const handleViewSubItemDelete = async () => {
      try {
        await deleteViewSubItem(autoServiceId, employeeId);
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
                    {employee.title}
                </Col>
                <Col>
                    <Link to={`/autoServices/${autoServiceId}/employees/${employeeId}`}>Edit view sub item</Link>
                </Col>
                <Col><Button onClick={handleViewSubItemDelete}>Delete view sub item</Button></Col>

                </Row>
            </Card.Body>
        </Card>
    );
}

export default ViewSubItem;