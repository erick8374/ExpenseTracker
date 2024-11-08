import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";

import AccountCardModal from "./AccountCards";

const AccountMenu = () => {
    const [accounts, setAccounts] = useState([
        { id: 1, name: "Conta Banrisul", initial_income: 1000 },
        { id: 2, name: "Conta Sicredi", initial_income: 2467 },
        { id: 3, name: "Conta Nubank", initial_income: 2467 },
    ]);
    const [incomesByAccount, setIncomesByAccount] = useState({});

    useEffect(() => {
        const fetchIncomes = async () => {
            try {
                const response = await axios.get("http://localhost:3001/webmob/api/incomes");
                const incomes = response.data;

                // Agrupar rendas por id de conta
                const groupedIncomes = incomes.reduce((acc, income) => {
                    const accountId = income.account.id; // Supondo que income tenha o campo account.id
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
                                total_income: incomesByAccount[account.id],
                            }}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default AccountMenu;
