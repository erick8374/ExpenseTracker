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
import NewAccountsTable from "./components/newAccountsTable";

const Income = () => {
    return (
        <>
        <Container>
      <Row className="align-items-center mb-4">
                <AccountMenu></AccountMenu>
            </Row>
      <Row>
            <Col>                
        <       NewIncomesTable></NewIncomesTable>
            </Col>                
            <Col>                    
                <IncomePerPeriod/>
                <NewAccountsTable/>
            </Col>
      </Row>
        </Container>
        </>
    )
}

export default Income