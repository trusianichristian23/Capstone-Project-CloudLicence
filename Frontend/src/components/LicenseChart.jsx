import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

function LicenseChart({ data }) {
  // Palette uniformata a quella di Analysis.jsx
  const COLORS = ['#38bdf8', '#34d399', '#fbbf24', '#f87171', '#818cf8'];
  const safeData = data || [];
  const uniqueCategories = [...new Set(safeData.map(item => item.category))];

  const chartData = uniqueCategories.map(cat => ({
    name: cat,
    value: safeData.filter(item => item.category === cat).length
  }));

  const CustomTick = ({ x, y, payload }) => {
    return (
      <text x={x} y={y + 20} textAnchor="middle" fill="#475569" fontWeight="600" fontSize="12">
        {payload.value}
      </text>
    );
  };

  return (
    <div className="table-container" style={{ marginBottom: '32px', height: '300px', width: '100%' }}>
      <h3 style={{ marginBottom: '20px' }}>Distribuzione Licenze</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
          <XAxis 
            dataKey="name" 
            tick={<CustomTick />} 
            axisLine={false} 
            tickLine={false} 
            interval={0} 
          />
          <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
          <Tooltip cursor={{ fill: '#f1f5f9' }} />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LicenseChart;
