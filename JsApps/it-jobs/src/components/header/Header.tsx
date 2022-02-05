import { observer } from "mobx-react-lite";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { UseStore } from "../../stores/Store";
import Path from "../../utils/route/Path";

const Header = () => {
    const { userStore } = UseStore();
    const isLogged = userStore.user.isLogin;
    console.log(userStore.getUser.id);
    console.log(userStore.getUser.isLogin);
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href={Path.home}>It Jobs</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">Offerts</Nav.Link>
                        {isLogged ? (
                            <NavDropdown title="My Account" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">My Offert</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">My Company</NavDropdown.Item>
                            </NavDropdown>
                        ) : null}
                    </Nav>
                    <Nav>
                        {isLogged ? (
                            <Nav.Link onClick={userStore.logout}>Logout</Nav.Link>
                        ) : (
                            <Nav.Link href={Path.login}>Login</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default observer(Header);