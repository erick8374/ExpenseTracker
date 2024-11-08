import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
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

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Despesas por Cateogria",
    }
  },
};

const ExpensePerCategory = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Gastos por Categoria',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchExpensesData = async () => {
      try {
        const categoriesResponse = await axios.get('http://localhost:3001/webmob/api/categories');
        const categories = categoriesResponse.data;

        const labels = categories.map((cat) => cat.name);
        const expenseData = [];
        for (const category of categories) {
          const expensesResponse = await axios.get(`http://localhost:3001/webmob/api/expenses/category/${category.id}`);
          const expenses = expensesResponse.data;
          const totalExpense = expenses.reduce((acc, expense) => acc + parseFloat(expense.value), 0);
          expenseData.push(totalExpense);
        }

        setData((prevData) => ({
          ...prevData,
          labels: labels,
          datasets: [{ ...prevData.datasets[0], data: expenseData }],
        }));
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchExpensesData();
  }, []);

  return (
    <div style={{ width: '350px', height: '350px' }}>
      <Pie options={options} data={data} />
    </div>
  );
};

export default ExpensePerCategory;
