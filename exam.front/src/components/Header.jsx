import { useContext } from 'react';
import { AuthContext } from './auth/AuthContext';
import { Container, Nav, Navbar } from 'react-bootstrap';

function Header() {
    const authContext = useContext(AuthContext);
    return ( 
        <Navbar>
            <Container>
                <Navbar.Brand href='/'>Application</Navbar.Brand>
                <Nav>
                    {!authContext.user ? (
                        <Nav.Link href='/login'>Login</Nav.Link>
                    ) : (
                        <>
                        <Nav.Link href='/viewItems'>View Items</Nav.Link>
                        <Nav.Link href='/postItems'>Post Items</Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
     );
}

export default Header;