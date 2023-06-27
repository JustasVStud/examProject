import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { getAutoServices } from '../service/autoService.service';
import { deleteAutoService } from '../service/autoService.service';
import { AuthContext } from '../auth/AuthContext';
import { useContext } from 'react';
function AutoServiceList() {
    const [autoServices, setAutoServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const authContext = useContext(AuthContext);
    const isAdmin = authContext.hasRole('ADMIN');
  const fetchAutoServices = async () => {
    try {
      setIsLoading(true);
      const autoServices = await getAutoServices();
      setAutoServices(autoServices);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAutoServices();
  }, []);

  const handleAutoServiceDelete = async (autoServiceId) => {
    try {
      await deleteAutoService(autoServiceId);
      fetchAutoServices();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row>
        <h2>AutoServices</h2>
      </Row>
      <Row>
        {isLoading? (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
        ): (
            autoServices.length > 0 ? (
              autoServices.map((autoService) => (
                <Card key={autoService.id}>
                  <Link to={`/autoServices/${autoService.id}`}>
                    <Card.Body>
                      <Card.Title>{autoService.title}</Card.Title>
                      {isAdmin && <Button onClick={() => handleAutoServiceDelete(autoService.id)}>Delete Auto Service</Button>}
                    </Card.Body>
                  </Link>
                </Card>
              ))
            ) : (
              <h4>No AutoServices were found</h4>
            )
        )}
      </Row>
      {isAdmin &&      
        <Row>
            <Button variant="sucess">
              <Link to="/autoServices/create">
                Create new
              </Link>
            </Button>
        </Row>
      }
    </Container>
  );
}


export default AutoServiceList;