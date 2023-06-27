import { Container, Spinner, Row, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAutoService, getEmployees } from '../service/autoService.service';
import { Link } from 'react-router-dom';
import Employee from './Employee';
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';

function AutoService() {
  const authContext = useContext(AuthContext);
  const isAdmin = authContext.hasRole('ADMIN');
    const [autoService, setAutoService] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [employees, setEmployees] = useState([]);
    let {id} = useParams();

    const fetchAutoService = async(id) => {
        try{
            setIsLoading(true);
            const autoService = await getAutoService(id);
            setAutoService(autoService);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    const fetchEmployees = async (id) => {
        try {
          setIsLoading(true);
          const employees = await getEmployees(id);
          setEmployees(employees);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };
      
      useEffect(() => {
        if(id !== undefined){
            fetchAutoService(id);
            fetchEmployees(id);
        }
      }, [id]);

      const handleEmployeeDelete = () => {
        if(id !== undefined) fetchEmployees(id);
      }
    return ( 
        <Container>
            {isLoading ? (
                <Spinner animation='border' role='status'>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ): (
              autoService ? (
                <>
              <Row>
                <h2>
                  {autoService.title}
                </h2>
              </Row>
              <Row>
                <h3> Director: {autoService.director}</h3>
              </Row>
              <Row>
                <h3>Address: {autoService.address}</h3>
              </Row>
              <Row>
              {employees.length > 0 ? (
              employees.map((employee) => (
                <Employee employee={employee} employeeId={employee.id} key={employee.id} onDelete={handleEmployeeDelete}  />
              ))
              ):(
                <Row>There are no currently no employess in this auto service</Row>
              )}
              </Row>
              {isAdmin && 
              <Row>
                <Button variant='warning'>
                  <Link to={`/autoServices/${autoService.id}/edit`}>Edit View Item</Link>
                </Button>
                <Button variant='success'>
                  <Link to={`/employees/create`}>Add employee</Link>
                </Button>
              </Row>
              }
            </>
              )  : (
                <Row>not found</Row>
              )
            )}
        </Container>
     );
}

export default AutoService;