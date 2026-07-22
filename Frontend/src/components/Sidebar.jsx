import { useState } from 'react';
import { LayoutDashboard, CreditCard, Users, BarChart3, Settings, LogOut, LayoutGrid, ClipboardList, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();
  const isAdmin = localStorage.getItem('role') === 'admin';
  const [isOpen, setIsOpen] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/login';
  };

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Header mobile con bottone Hamburger */}
      <div className="mobile-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <LayoutGrid size={24} color="#38bdf8" />
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>CloudLicence</span>
        </div>
        <button className="menu-toggle-btn" onClick={toggleSidebar}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay scuro per chiudere il menu su mobile */}
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={closeSidebar}></div>

      <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div>
          <div className="logo-container">
            <LayoutGrid size={32} color="#38bdf8" />
            <h2 className="logo-text">
              <span style={{ color: '#ffffff' }}>Cloud</span>
              <span style={{ color: '#38bdf8' }}>Licence</span>
            </h2>
          </div>
          <ul className="menu">
            <li className={location.pathname === '/' ? 'active' : ''} onClick={closeSidebar}>
              <Link to="/"><LayoutDashboard size={20} /> Dashboard</Link>
            </li>
            <li className={location.pathname === '/subscriptions' ? 'active' : ''} onClick={closeSidebar}>
              <Link to="/subscriptions"><CreditCard size={20} /> Abbonamenti</Link>
            </li>
            <li className={location.pathname === '/users' ? 'active' : ''} onClick={closeSidebar}>
              <Link to="/users"><Users size={20} /> Utenti</Link>
            </li>
            <li className={location.pathname === '/analysis' ? 'active' : ''} onClick={closeSidebar}>
              <Link to="/analysis"><BarChart3 size={20} /> Analisi</Link>
            </li>
            {isAdmin && (
              <li className={location.pathname === '/logs' ? 'active' : ''} onClick={closeSidebar}>
                <Link to="/logs"><ClipboardList size={20} /> Log Attività</Link>
              </li>
            )}
            <li className={location.pathname === '/settings' ? 'active' : ''} onClick={closeSidebar}>
              <Link to="/settings"><Settings size={20} /> Impostazioni</Link>
            </li>
          </ul>
        </div>
        
        <div className="sidebar-footer">
          <button 
            onClick={handleLogout} 
            className="logout-btn" 
            style={{ color: '#ef4444' }}
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;