import React from 'react';

//Bootstrap
import { Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';

function NavBar() {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home"><h1>GitJobs</h1></Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home"><h5>Home</h5></Nav.Link>
                    <Nav.Link href="#features"><h5>About</h5></Nav.Link>
                    <Nav.Link href="#pricing"><h5>Github</h5></Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar>
        </div>
    )
}

export default NavBar
