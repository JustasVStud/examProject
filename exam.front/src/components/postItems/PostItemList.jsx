import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { getPostItems } from '../service/postItem.service';
import { deletePostItem } from '../service/postItem.service';


function PostItemList() {
    const [postItems, setPostItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  const fetchPostItems = async () => {
    try {
      setIsLoading(true);
      const postItems = await getPostItems();
      setPostItems(postItems);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchPostItems();
  }, []);

  const handlePostItemDelete = async (postItemId) => {
    try {
      await deletePostItem(postItemId);
      fetchPostItems();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row>
        <h2>PostItems</h2>
      </Row>
      <Row>
        {isLoading? (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
        ): (
            postItems.length > 0 ? (
              postItems.map((postItem) => (
                <Card key={postItem.id}>
                  <Link to={`/postItems/${postItem.id}`}>
                    <Card.Body>
                      <Card.Title>{postItem.title}</Card.Title>
                      <Button onClick={() => handlePostItemDelete(postItem.id)}>Delete PostItem</Button>
                    </Card.Body>
                  </Link>
                </Card>
              ))
            ) : (
              <h4>No PostItems were found</h4>
            )
        )}
      </Row>
        <Row>
            <Button variant="sucess">
              <Link to="/postItems/create">
                Create new
              </Link>
            </Button>
        </Row>
    </Container>
  );
}


export default PostItemList;