import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
//COMPONENTS
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "next/image";
//ASSETS
import logo from "../public/honeyCombIcon.png";

const HomeNavbar: React.FC = () => {
  const { status } = useSession();
  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <Image src={logo} alt="icon" width={30} height={30} /> Hive
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            {status === "unauthenticated" ? (
              <Nav.Link href="/Login">Login</Nav.Link>
            ) : (
              <Nav.Link onClick={() => signOut()}>Logout</Nav.Link>
            )}
            <Nav.Link>About</Nav.Link>
            <Nav.Link>Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HomeNavbar;
