import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const PIE_COLORS = ['#10b981', '#f59e0b', '#ef4444'];

const ChartSection = ({ statsData, issueCounts }) => {

  const pieData = [
    { name: 'Clean', value: statsData.cleanRows },
    { name: 'Issues', value: statsData.totalIssues },
    { name: 'Fraud', value: statsData.fraudCount },
  ].filter((d) => d.value > 0);

  const barData = Object.entries(issueCounts).map(([name, value]) => ({
    name,
    value,
  }));

  if (statsData.fraudCount > 0) {
    barData.push({
      name: 'Fraud',
      value: statsData.fraudCount,
    });
  }

  return (
    <div className="space-y-10">

      {/* TITLE */}
      <div>
        <h3 className="text-xl font-semibold text-slate-800">
          Report Analysis
        </h3>
      </div>

      {/* PIE CHART */}
      <div className="bg-slate-50 rounded-2xl p-6">
        <p className="text-sm font-semibold text-slate-600 mb-5">
          Overall Breakdown
        </p>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={4}
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i]} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                borderRadius: 10,
                border: 'none',
                fontSize: 13,
              }}
            />

            <Legend
              iconType="circle"
              iconSize={10}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* BAR CHART */}
      <div className="bg-slate-50 rounded-2xl p-6">
        <p className="text-sm font-semibold text-slate-600 mb-5">
          Issue Type Breakdown
        </p>

        {barData.length === 0 ? (
          <div className="flex items-center justify-center h-52 text-slate-400 text-sm">
            No issues detected 🎉
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={barData}
              margin={{
                top: 10,
                right: 20,
                left: -10,
                bottom: 20,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
              />

              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: '#64748b' }}
              />

              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 11, fill: '#64748b' }}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: 10,
                  border: 'none',
                  fontSize: 13,
                }}
              />

              <Bar
                dataKey="value"
                radius={[6, 6, 0, 0]}
                fill="#6366f1"
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
};

export default ChartSection;