import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import AccountCardModal from "./AccountCards";

const AccountMenu = () => {
    const [accounts, setAccounts] = useState([]);
    const [incomesByAccount, setIncomesByAccount] = useState({});

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get("http://localhost:3001/webmob/api/accounts");
                setAccounts(response.data);
            } catch (error) {
                console.error("Erro ao buscar contas:", error);
            }
        };

        fetchAccounts();
    }, []);

    useEffect(() => {
        const fetchIncomes = async () => {
            try {
                const response = await axios.get("http://localhost:3001/webmob/api/incomes");
                const incomes = response.data;
                const groupedIncomes = incomes.reduce((acc, income) => {
                    const accountId = income.account.id;
                    acc[accountId] = (acc[accountId] || 0) + parseFloat(income.value);
                    return acc;
                }, {});

                setIncomesByAccount(groupedIncomes);
            } catch (error) {
                console.error("Erro ao buscar dados de incomes:", error);
            }
        };

        fetchIncomes();
    }, []);

    return (
        <Container>
            <Row>
                {accounts.map(account => (
                    <Col key={account.id}>
                        <AccountCardModal
                            account={{
                                ...account,
                                total_income: (parseFloat(account.initial_income) || 0) + (incomesByAccount[account.id] || 0),
                            }}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default AccountMenu;
