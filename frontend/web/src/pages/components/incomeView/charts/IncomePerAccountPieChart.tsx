import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import React from "react";
import TransactionService from "../../../services/transactionService"; 
import AccountService from "../../../services/accountService"; 
import TransactionInterface from "../../../interfaces/TransactionInterface";
import AccountInterface from "../../../interfaces/AccountInterface";
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

const IncomePerAccountPieChart = () => {
  const [accounts, setAccounts] = useState<AccountInterface[]>([]);
  const [incomesByAccount, setIncomesByAccount] = useState<Record<number, number>>({});

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
        const transactions: TransactionInterface[] = await TransactionService.getTransactions(); 
        const groupedIncomes = transactions.reduce((acc: Record<number, number>, transaction) => {
          if (transaction.type === "income" && transaction.account?.id) {
            const accountId = transaction.account.id;
            acc[accountId] = (acc[accountId] || 0) + (transaction.amount || 0);
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
    };

    fetchData();
  }, []);

  const chartData = {
    labels: accounts.map((account) => account.name),
    datasets: [
      {
        data: accounts.map((account) => {
          const totalIncomes = incomesByAccount[account.id!] || 0;
          return account.balance || 0 + totalIncomes;
        }),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default IncomePerAccountPieChart
