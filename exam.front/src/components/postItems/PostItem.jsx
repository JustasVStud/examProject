import { Container, Spinner, Row, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostItem, getPostSubItems } from '../service/postItem.service';
import { Link } from 'react-router-dom';
import PostSubItem from './PostSubItem';

function PostItem() {
    const [postItem, setPostItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [postSubItems, setPostSubItems] = useState([]);
    let {id} = useParams();

    const fetchPostItem = async(id) => {
        try{
            setIsLoading(true);
            const postItem = await getPostItem(id);
            setPostItem(postItem);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    const fetchPostSubItems = async (id) => {
        try {
          setIsLoading(true);
          const meals = await getPostSubItems(id);
          setPostSubItems(meals);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };
      
      useEffect(() => {
        if(id !== undefined){
            fetchPostItem(id);
            fetchPostSubItems(id);
        }
      }, [id]);

      const handlePostSubItemDelete = () => {
        if(id !== undefined) fetchPostSubItems(id);
      }
    return ( 
        <Container>
            {isLoading ? (
                <Spinner animation='border' role='status'>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ): (
              postItem ? (
                <>
              <Row>
                <h2>
                  {postItem.title}
                </h2>
              </Row>
              <Row>
              {postSubItems.length > 0 ? (
              postSubItems.map((postSubItem) => (
                <PostSubItem postSubItem={postSubItem} postItemId={postItem.id} postSubItemId={postSubItem.id} key={postSubItem.id} onDelete={handlePostSubItemDelete}  />
              ))
              ):(<></>)}
              </Row>
              <Row>
                <Button variant='warning'>
                  <Link to={`/postItems/${postItem.id}/edit`}>Edit Post Item</Link>
                </Button>
                <Button variant='success'>
                  <Link to={`/postItems/${postItem.id}/postSubItems/create`}>Add postSubItem</Link>
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

export default PostItem;