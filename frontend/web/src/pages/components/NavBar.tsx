import Link from "next/link";
//import { useRouter } from 'next/router'
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import 'bootstrap-icons/font/bootstrap-icons.css';

const NavbarTop = () => {
  //const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    //Pode ser necessário ou não.
    //router.push("/login");
  };

  return (
    <Navbar bg="dark" expand="md" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>
          <Link href="/">Home</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} href="/dashboard" passHref>
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} href="/expenses" passHref>
              Gastos e Orçamento
            </Nav.Link>
            <Nav.Link as={Link} href="/income" passHref>
              Contas e Rendimentos
            </Nav.Link>
            <Nav.Link as={Link} href="/cachorro" passHref>
              Dog do Dia
            </Nav.Link>
            <Nav.Link as={Link} href="#" passHref onClick={handleLogout}>
              <i className="bi bi-box-arrow-in-right"></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarTop;
