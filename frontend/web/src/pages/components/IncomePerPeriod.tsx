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
        const response = await axios.get('http://localhost:3001/webmob/api/incomes');
        const incomes = response.data;

        const incomeByMonth = incomes.reduce((acc, income) => {
          const month = new Date(income.date).toLocaleString('default', { month: 'long' });
          const incomeValue = parseFloat(income.value); // Converter valor para número

          acc[month] = (acc[month] || 0) + incomeValue;
          return acc;
        }, {});

        const labels = Object.keys(incomeByMonth);
        const data = Object.values(incomeByMonth);
        console.log(data);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Renda do Usuário',
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
