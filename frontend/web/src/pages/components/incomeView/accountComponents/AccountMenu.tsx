import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import AccountCardModal from "./AccountCards";
import AccountService from "../../../services/accountService"; // Importa o serviço
import AccountInterface from "../../../interfaces/AccountInterface"; // Importa a interface

const AccountMenu = () => {
  const [accounts, setAccounts] = useState<AccountInterface[]>([]);
  const [incomesByAccount, setIncomesByAccount] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accountData = await AccountService.getAccounts(); // Usa o serviço para buscar contas
        setAccounts(accountData);
      } catch (error) {
        console.error("Erro ao buscar contas:", error);
      }
    };

    const fetchIncomes = async () => {
      try {
        const transactions = await AccountService.getAccounts(); // Substitua por um serviço adequado para buscar transações
        const groupedIncomes = transactions.reduce((acc: Record<number, number>, transaction: any) => {
          if (transaction.type === "income") {
            const accountId = transaction.account.id;
            acc[accountId] = (acc[accountId] || 0) + parseFloat(transaction.amount);
          }
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
                total_income: account.balance + (incomesByAccount[account.id!] || 0),
              }}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AccountMenu;
