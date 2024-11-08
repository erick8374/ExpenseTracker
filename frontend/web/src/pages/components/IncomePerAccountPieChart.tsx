import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import React from "react";
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
    RadialLinearScale
  } from "chart.js"
  
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

        fetchAccounts();
        fetchIncomes();
    }, []);

    const chartData = {
        labels: accounts.map(account => account.name),
        datasets: [
            {
                data: accounts.map(account => {
                    const totalIncomes = incomesByAccount[account.id] || 0;
                    return parseFloat(account.initial_income) + totalIncomes;
                }),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ]
            }
        ]
    };

    return (
        <>
                <Pie data={chartData} />
        </>
    );
};

export default IncomePerAccountPieChart;
