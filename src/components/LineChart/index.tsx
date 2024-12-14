/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  CategoryScale
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js modules
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  CategoryScale
);

const LineChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Total Subscribers Earning',
        data: [
          50000, 200000, 400000, 198000, 250000, 300000, 500000, 700000, 900000, 850000, 600000,
          550000
        ],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        tension: 0.3,
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false // Hides legend (optional)
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `₦${context.raw.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false // Hides grid lines for X-axis
        }
      },
      y: {
        ticks: {
          callback: function (value: any) {
            return value >= 1000000 ? `${value / 1000000}M` : `${value / 1000}k`;
          }
        },
        grid: {
          display: false // Hides grid lines for X-axis
        }
      }
    }
  };

  return (
    <div style={{ height: '100%', width: '100%' }} className="shadow-sm p-5">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
