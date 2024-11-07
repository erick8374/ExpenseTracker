import { Col, Container, Row } from "react-bootstrap";
import IncomePerPeriod from "./components/IncomePerPeriod"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js"
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
import AccountCardModal from "./components/accountComponents/AccountCards";
import AccountMenu from "./components/accountComponents/AccountMenu";
import NewIncomesTable from "./components/newIncomesTable";

const Income = () => {
    return (
        <>
        <Container>
      <Row className="align-items-center mb-4">
                <AccountMenu></AccountMenu>
            </Row>
      <Row className="align-items-center mb-4">
            <Col>                
        <       NewIncomesTable></NewIncomesTable>
            </Col>                
            <Col>                    
                <IncomePerPeriod/>
            </Col>
      </Row>
        </Container>
        </>
    )
}

export default Income