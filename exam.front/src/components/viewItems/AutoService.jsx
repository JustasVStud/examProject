import { Container, Spinner, Row, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAutoService, getEmployees } from '../service/autoService.service';
import { Link } from 'react-router-dom';
import Employee from './Employee';

function AutoService() {
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
          const meals = await getEmployees(id);
          setEmployees(meals);
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
              {employees.length > 0 ? (
              employees.map((employee) => (
                <Employee employee={employee} autoServiceId={autoService.id} employeeId={employee.id} key={employee.id} onDelete={handleEmployeeDelete}  />
              ))
              ):(<></>)}
              </Row>
              <Row>
                <Button variant='warning'>
                  <Link to={`/autoServices/${autoService.id}/edit`}>Edit View Item</Link>
                </Button>
                <Button variant='success'>
                  <Link to={`/autoServices/${autoService.id}/employees/create`}>Add employee</Link>
                </Button>
              </Row>
            </>
              )  : (
                <Row>not found</Row>
              )
            )}
        </Container>
     );
}

export default AutoService;