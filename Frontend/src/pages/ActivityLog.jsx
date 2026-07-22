import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';

function ActivityLog() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await api.get('/licenses/logs');
        setLogs(response.data);
      } catch (error) { console.error("Errore:", error); }
      finally { setLoading(false); }
    };
    fetchLogs();
  }, []);

  return (
    <div className="main-content" style={{ padding: '24px' }}>
      <h2>Log Attività Aziendale</h2>
      {loading ? <p>Caricamento...</p> : (
        <table className="styled-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #f1f5f9' }}>
              <th style={{ padding: '12px' }}>Data</th>
              <th style={{ padding: '12px' }}>Utente</th>
              <th style={{ padding: '12px' }}>Azione</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px' }}>{new Date(log.timestamp).toLocaleString()}</td>
                <td style={{ padding: '12px' }}>{log.userEmail}</td>
                <td style={{ padding: '12px' }}>{log.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ActivityLog;