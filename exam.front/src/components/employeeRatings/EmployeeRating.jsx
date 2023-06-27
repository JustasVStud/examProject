import { Col} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getEmployeeRating } from '../service/employeeRating.service';


function EmployeeRating(id) {
    const [employeeRating, setEmployeeRating] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


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
      <Col>
      {isLoading ? (
        <span>0.0</span>
    ): (
          <span>
           Rating: {employeeRating.rating}
          </span>
      )}
        </Col>
    );
}

export default EmployeeRating;