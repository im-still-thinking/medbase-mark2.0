import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export default function MedNav() {
  return (
    <Navbar bg="light" fixed="top" expand="lg" variant="light">
      <Container fluid>
        <Navbar.Brand href="/">MedBase</Navbar.Brand>
        
        
          <Link to="/auth">
            <button className="btn btn-outline-success my-2 my-sm-0">
              Log Out
            </button>
          </Link>
        
      </Container>
    </Navbar>
  );
}
