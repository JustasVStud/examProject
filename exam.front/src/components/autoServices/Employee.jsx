import { Link } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { deleteEmployee } from '../service/autoService.service';
function Employee({employee, employeeId, onDelete}) {

    const handleEmployeeDelete = async () => {
      try {
        await deleteEmployee(employeeId);
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
                    {employee.name}
                </Col>
                <Col>
                    {employee.surname}
                </Col>
                <Col>
                    {employee.specialty}
                </Col>
                <Col>
                    {employee.city}
                </Col>
                <Col>
                    <Link to={`/employees/${employeeId}`}>Edit employee</Link>
                </Col>
                <Col>
                    <Link to={`/employeeRatings/create`}>
                      <Button>
                        Rate employee
                      </Button>
                      </Link>
                </Col>
                <Col><Button onClick={handleEmployeeDelete}>Delete employee</Button></Col>

                </Row>
            </Card.Body>
        </Card>
    );
}

export default Employee;