import { Col, Container, Row } from "react-bootstrap";

import AccountCardModal from "./AccountCards";

const AccountMenu = () => {
    return (
        <>
        <Container>
            <Row>
                <Col>
                <AccountCardModal account={{"id":1,"name":"Conta Banrisul","initial_income":1000}}/>
                </Col>
                <Col>
                <AccountCardModal account={{"id":1,"name":"Conta Sicredi","initial_income":2467}}/>
                </Col>
                <Col>
                <AccountCardModal account={{"id":1,"name":"Conta Nubank","initial_income":2467}}/>
                </Col>
            </Row>

        </Container>
        </>
    )
}

export default AccountMenu