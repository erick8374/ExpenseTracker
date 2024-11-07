import { Container, Navbar } from "react-bootstrap"
import HealthStatus from "./HealthCheck"

const FooterBar = () => {

    return (
    <Navbar bg="dark" data-bs-theme="dark" fixed="bottom">
        <Container>
          <Navbar.Brand>
            <HealthStatus/>
          </Navbar.Brand>
        </Container>
      </Navbar>
    )
}

export default FooterBar