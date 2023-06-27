import { Container, Spinner, Row, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getViewItem, getViewSubItems } from '../service/viewItem.service';
import { Link } from 'react-router-dom';
import ViewSubItem from './ViewSubItem';

function ViewItem() {
    const [viewItem, setViewItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [viewSubItems, setViewSubItems] = useState([]);
    let {id} = useParams();

    const fetchViewItem = async(id) => {
        try{
            setIsLoading(true);
            const viewItem = await getViewItem(id);
            setViewItem(viewItem);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    const fetchViewSubItems = async (id) => {
        try {
          setIsLoading(true);
          const meals = await getViewSubItems(id);
          setViewSubItems(meals);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };
      
      useEffect(() => {
        if(id !== undefined){
            fetchViewItem(id);
            fetchViewSubItems(id);
        }
      }, [id]);

      const handleViewSubItemDelete = () => {
        if(id !== undefined) fetchViewSubItems(id);
      }
    return ( 
        <Container>
            {isLoading ? (
                <Spinner animation='border' role='status'>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ): (
              viewItem ? (
                <>
              <Row>
                <h2>
                  {viewItem.title}
                </h2>
              </Row>
              <Row>
              {viewSubItems.length > 0 ? (
              viewSubItems.map((viewSubItem) => (
                <ViewSubItem viewSubItem={viewSubItem} viewItemId={viewItem.id} viewSubItemId={viewSubItem.id} key={viewSubItem.id} onDelete={handleViewSubItemDelete}  />
              ))
              ):(<></>)}
              </Row>
              <Row>
                <Button variant='warning'>
                  <Link to={`/viewItems/${viewItem.id}/edit`}>Edit View Item</Link>
                </Button>
                <Button variant='success'>
                  <Link to={`/viewItems/${viewItem.id}/viewSubItems/create`}>Add viewSubItem</Link>
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

export default ViewItem;