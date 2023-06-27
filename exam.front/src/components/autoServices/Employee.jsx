import { Link } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { deleteEmployee } from '../service/autoService.service';
function Employee({employee, employeeId, onDelete}) {

    const handleEmployeeDelete = async () => {
      try {
        await deleteEmployee( employeeId);
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
                    {employee}
                </Col>
                <Col>
                    <Link to={`/${employeeId}`}>Edit employee</Link>
                </Col>
                <Col><Button onClick={handleEmployeeDelete}>Delete view sub item</Button></Col>

                </Row>
            </Card.Body>
        </Card>
    );
}

export default Employee;