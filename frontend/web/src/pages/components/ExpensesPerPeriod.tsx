import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const IncomePerPeriod = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/webmob/api/expenses');
        const expenses = response.data;

        const expenseByMonth = expenses.reduce((acc, expense) => {
          const month = new Date(expense.date).toLocaleString('default', { month: 'long' });
          const expenseValue = parseFloat(expense.value);

          acc[month] = (acc[month] || 0) + expenseValue;
          return acc;
        }, {});

        const labels = Object.keys(expenseByMonth);
        const data = Object.values(expenseByMonth);
        console.log(data);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Gastos por Período',
              data: data,
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
            },
          ],
        });
      } catch (error) {
        console.error('Erro ao buscar dados de renda:', error);
      }
    };

    fetchIncomeData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Gastos por Período',
      },
    },
  };

  return <Line options={options} data={chartData} />;
};

export default IncomePerPeriod;
