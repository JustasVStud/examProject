import { Link } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { deleteEmployee } from '../service/autoService.service';
import { AuthContext } from '../auth/AuthContext';
import { useContext } from 'react';
import EmployeeRating from '../employeeRatings/EmployeeRating';
function Employee({employee, employeeId, onDelete}) {
  const authContext = useContext(AuthContext);
  const isAdmin = authContext.hasRole('ADMIN');
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
                    Name: {employee.name}
                </Col>
                <Col>
                    Surname: {employee.surname}
                </Col>
                <Col>
                    Specialty:{employee.specialty}
                </Col>
                <Col>
                    City:{employee.city}
                </Col>
                <EmployeeRating id={employee.id}/>
                <Col>
                    <Link to={`/employeeRatings/create`}>
                      <Button>
                        Rate employee
                      </Button>
                      </Link>
                </Col>
                {isAdmin && 
                <>
                <Col>
                    <Link to={`/employees/${employeeId}`}>Edit employee</Link>
                </Col>
                <Col><Button onClick={handleEmployeeDelete}>Delete employee</Button></Col>
                </>
                }

                </Row>
            </Card.Body>
        </Card>
    );
}

export default Employee;