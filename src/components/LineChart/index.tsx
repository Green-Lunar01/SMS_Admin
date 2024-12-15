/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
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
  const [selectedYear, setSelectedYear] = useState('2023'); // State for selected year

  // Data for different years
  const yearlyData = {
    '2023': [
      50000, 200000, 400000, 198000, 250000, 300000, 500000, 700000, 900000, 850000, 600000, 550000
    ],
    '2024': [
      60000, 150000, 350000, 220000, 280000, 320000, 450000, 650000, 800000, 780000, 550000, 500000
    ]
  };

  // Chart data dynamically based on selected year
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: `Total Subscribers Earning (${selectedYear})`,
        data: yearlyData[selectedYear as keyof typeof yearlyData],
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
          stepSize: 1500 // Controls the interval between ticks
          // callback: function (value: any) {
          //   if (value === 1000000) return '1M';
          //   if (value === 500000) return '500k';
          //   if (value === 200000) return '200k';
          //   if (value === 50000) return '50k';
          //   return '';
          // }
        },
        grid: {
          display: false // Hides grid lines for X-axis
        },
        suggestedMin: 0, // Ensures 0 is the starting point of the Y-axis
        suggestedMax: 1000000 // Ensures 1M is the maximum value
      }
    }
  };

  return (
    <div className="shadow-sm p-5 flex flex-col justify-between items-start h-full">
      <div className="flex justify-between items-start w-full">
        <div>
          <p className="text-sm font-semibold">Total subscribers earning</p>
          <p className="text-primary-light text-xs font-semibold">$350.00</p>
        </div>

        {/* Year Selector */}
        <select
          className="text-xs border py-2 px-3 rounded-m outline-primary-light"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)} // Update selected year
        >
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </div>

      <div style={{ height: '100%', width: '100%' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
