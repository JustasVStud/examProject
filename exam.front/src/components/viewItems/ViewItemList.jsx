import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { getViewItems } from '../service/viewItem.service';
import { deleteViewItem } from '../service/viewItem.service';


function ViewItemList() {
    const [viewItems, setViewItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  const fetchViewItems = async () => {
    try {
      setIsLoading(true);
      const viewItems = await getViewItems();
      setViewItems(viewItems);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchViewItems();
  }, []);

  const handleViewItemDelete = async (viewItemId) => {
    try {
      await deleteViewItem(viewItemId);
      fetchViewItems();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row>
        <h2>ViewItems</h2>
      </Row>
      <Row>
        {isLoading? (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
        ): (
            viewItems.length > 0 ? (
              viewItems.map((viewItem) => (
                <Card key={viewItem.id}>
                  <Link to={`/viewItems/${viewItem.id}`}>
                    <Card.Body>
                      <Card.Title>{viewItem.title}</Card.Title>
                      <Button onClick={() => handleViewItemDelete(viewItem.id)}>Delete ViewItem</Button>
                    </Card.Body>
                  </Link>
                </Card>
              ))
            ) : (
              <h4>No ViewItems were found</h4>
            )
        )}
      </Row>
        <Row>
            <Button variant="sucess">
              <Link to="/viewItems/create">
                Create new
              </Link>
            </Button>
        </Row>
    </Container>
  );
}


export default ViewItemList;