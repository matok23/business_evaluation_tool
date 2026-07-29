import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  type ChartOptions,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import type { Valuation } from '../contracts/business';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

type BusinessValuationChartProps = {
  valuations: Valuation[];
};

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: '2-digit',
});

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

function getLabel(
  valuation: Valuation,
  index: number
): string {
  const date = new Date(valuation.createdAt);

  if (Number.isNaN(date.getTime())) {
    return `Valuation ${index + 1}`;
  }

  return dateFormatter.format(date);
}

export default function BusinessValuationChart({
  valuations,
}: BusinessValuationChartProps) {
  const orderedValuations = [...valuations].sort(
    (first, second) =>
      new Date(first.createdAt).getTime() -
      new Date(second.createdAt).getTime()
  );

  const data = {
    labels: orderedValuations.map(getLabel),

    datasets: [
      {
        label: 'Lower valuation',
        data: orderedValuations.map(
          (valuation) => valuation.lower
        ),
        borderColor: '#64748b',
        backgroundColor: '#64748b',
        borderWidth: 2,
        pointRadius: 4,
        tension: 0.25,
      },
      {
        label: 'Upper valuation',
        data: orderedValuations.map(
          (valuation) => valuation.upper
        ),
        borderColor: '#3157d5',
        backgroundColor: '#3157d5',
        borderWidth: 2,
        pointRadius: 4,
        tension: 0.25,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,

    interaction: {
      mode: 'index',
      intersect: false,
    },

    plugins: {
      legend: {
        position: 'bottom',
      },

      tooltip: {
        callbacks: {
          label(context) {
            const label = context.dataset.label ?? '';
            const value = context.parsed.y ?? 0;

            return `${label}: ${currencyFormatter.format(value)}`;
          },
        },
      },
    },

    scales: {
      y: {
        beginAtZero: false,

        ticks: {
          callback(value) {
            return currencyFormatter.format(Number(value));
          },
        },
      },

      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  if (orderedValuations.length === 0) {
    return (
      <div className="valuation-chart-empty">
        No valuations available.
      </div>
    );
  }

  return (
    <div className="valuation-chart">
      <Line data={data} options={options} />
    </div>
  );
}