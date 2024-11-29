import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import AccountCardModal from "./AccountCards";
import AccountService from "../../../services/accountService";
import AccountInterface from "../../../interfaces/AccountInterface";
import transactionService from "@/pages/services/transactionService";

const AccountMenu = () => {
  const [accounts, setAccounts] = useState<AccountInterface[]>([]);
  const [incomesByAccount, setIncomesByAccount] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accountData = await AccountService.getAccounts(); 
        setAccounts(accountData);
      } catch (error) {
        console.error("Erro ao buscar contas:", error);
      }
    };

    const fetchIncomes = async () => {
      try {
        const transactions = await transactionService.getTransactionsbyType("income"); 
        const groupedIncomes = transactions.reduce((acc: Record<number, number>, transaction: any) => {
          const accountId = transaction.account.id;
          acc[accountId] = (acc[accountId] || 0) + parseFloat(transaction.amount || "0");
          return acc;
        }, {});
        setIncomesByAccount(groupedIncomes);
      } catch (error) {
        console.error("Erro ao buscar incomes:", error);
      }
    };

    const fetchData = async () => {
      await fetchAccounts();
      await fetchIncomes();
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Container>
      <Row>
        {accounts.map((account) => (
          <Col key={account.id}>
            <AccountCardModal
              account={{
                ...account,
                // Garantir que o valor de total_income seja calculado corretamente
                total_income: account.balance + (incomesByAccount[account.id] || 0),
              }}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AccountMenu;
