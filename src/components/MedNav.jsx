import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import logo from "../../src/imgs/MedBase.png";

export default function MedNav() {
  return (
    // <Navbar bg="light" fixed="top" expand="lg" variant="light">
    //   <Container fluid>
    //     <Navbar.Brand href="/">
    //       <img src={logo} alt="logo" className="navbarp_dash"/>
    //       MedBase
    //     </Navbar.Brand>
    //       <Link to="/auth">
    //         <button className="btn btn-outline-success my-2 my-sm-0">
    //           Log Out
    //         </button>
    //       </Link>
    //   </Container>
    // </Navbar>
    <div className="navbar3">
      <div className="nav_cont">
        <img src={logo} alt="logo" className="navbarp_dash"/>
        <b className="MedNav_text">MedBase</b>
      </div>
    
    <Link to="/auth">
        <button className="btn btn-success my-2 my-sm-0 nav_cont button_color">
            Log Out
        </button>
    </Link>
  </div>
  );
}
