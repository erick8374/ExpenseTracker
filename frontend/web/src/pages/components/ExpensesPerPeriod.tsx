import {Line} from "react-chartjs-2";

const data = {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        label: 'Gastos por Período',
        data: [65, 59, 80, 81],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  export const options = {
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
  const ExpensePerPeriod = () => {
    return <Line options= {options} data={data} />;


  }

  export default ExpensePerPeriod;