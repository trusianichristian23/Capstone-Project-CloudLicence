import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import api from '../api/axiosConfig';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const COLORS = ['#38bdf8', '#34d399', '#fbbf24', '#f87171', '#818cf8'];

function Analysis() {
  const [data, setData] = useState({ departmentCosts: [], usageStats: [] });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get('/licenses/analysis');
        setData({ departmentCosts: res.data.departmentCosts || [], usageStats: res.data.usageStats || [] });
      } catch (err) { console.error("Errore:", err); }
    };
    fetchAnalytics();
  }, []);

  const handleExportCSV = () => {
    const headers = ['Categoria', 'Costo Totale'];
    const rows = data.departmentCosts.map(item => [item._id, item.totalCost]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report-costi.csv';
    a.click();
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('Report Analisi Costi Licenze', 14, 22);
    const tableData = data.departmentCosts.map(item => [item._id, `€${item.totalCost}`]);
    
    autoTable(doc, { 
      startY: 30, 
      head: [['Categoria', 'Costo Totale']], 
      body: tableData 
    });
    
    doc.save('report-costi.pdf');
  };

  return (
    <div style={{ padding: '40px', background: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontWeight: '900', fontSize: '2rem', color: '#1e293b' }}>Analisi Costi</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleExportCSV} style={{ padding: '10px 20px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Esporta CSV</button>
          <button onClick={handleExportPDF} style={{ padding: '10px 20px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Esporta PDF</button>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '30px' }}>
        <div style={{ background: '#fff', borderRadius: '20px', padding: '30px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontWeight: '800', color: '#334155', marginBottom: '20px' }}>Distribuzione Budget</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data.departmentCosts} dataKey="totalCost" nameKey="_id" outerRadius={100} label={{ fontWeight: 'bold' }}>
                {data.departmentCosts.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: '#fff', borderRadius: '20px', padding: '30px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontWeight: '800', color: '#334155', marginBottom: '20px' }}>Stato Operativo</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.usageStats}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontWeight: 'bold' }} axisLine={false} />
              <YAxis axisLine={false} tick={{ fontWeight: 'bold' }} />
              <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
              <Bar dataKey="used" fill="#38bdf8" name="Attive" radius={[6, 6, 0, 0]} />
              <Bar dataKey="unused" fill="#f87171" name="Inattive" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
