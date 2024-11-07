import {Pie} from "react-chartjs-2";

const data = {
    labels: ['Aliementação', 'Educação', 'Casa', 'Lazer'],
    datasets: [
      {
        label: 'Gastos por Categoria',
        data: [65, 59, 80, 81],
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
  };

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Renda por Período',
      }
    },
  };
  const ExnpensePerCategory = () => {
    return (    <div style={{ width: '400px', height: '400px' }}> {/* Defina o tamanho desejado */}
      <Pie options={options} data={data} />
    </div>);


  }

  export default ExnpensePerCategory;