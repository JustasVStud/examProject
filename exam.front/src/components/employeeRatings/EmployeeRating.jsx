import { Container, Spinner, Row, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEmployeeRating } from '../service/employeeRating.service';
import { Link } from 'react-router-dom';


function EmployeeRating() {
    const [employeeRating, setEmployeeRating] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    let {id} = useParams();

    const fetchEmployeeRating = async(id) => {
        try{
            setIsLoading(true);
            const employeeRating = await getEmployeeRating(id);
            setEmployeeRating(employeeRating);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

      
      useEffect(() => {
        if(id !== undefined){
            fetchEmployeeRating(id);

        }
      }, [id]);


    return ( 
        <Container>
            {isLoading ? (
                <Spinner animation='border' role='status'>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ): (
              employeeRating ? (
                <>
              <Row>
                <h2>
                  {employeeRating.title}
                </h2>
              </Row>

              <Row>
                <Button variant='warning'>
                  <Link to={`/employeeRatings/${employeeRating.id}/edit`}>Edit Post Item</Link>
                </Button>
                <Button variant='success'>
                  <Link to={`/employeeRatings/${employeeRating.id}/postSubItems/create`}>Add postSubItem</Link>
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

export default EmployeeRating;