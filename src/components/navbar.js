import { Navbar,Container } from 'react-bootstrap';

 function Navbar1() {
    return (
      <>
        <Navbar bg="primary" variant="dark">
          <Container style={{ justifyContent: "center" }}>
            <Navbar.Brand href="#home">
              {/* <img
                alt=""
                src="../logo.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "} */}
              To Do App
            </Navbar.Brand>
          </Container>
        </Navbar>
      </>
    );}

    export default Navbar1;