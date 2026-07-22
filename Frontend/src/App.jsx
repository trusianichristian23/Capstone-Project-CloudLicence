import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Support from './pages/Support';
import Dashboard from './pages/Dashboard';
import Subscriptions from './pages/Subscriptions';
import Users from './pages/Users';
import Analysis from './pages/Analysis';
import ActivityLog from './pages/ActivityLog';
import Settings from './pages/Settings';
import Unauthorized from './pages/Unauthorized';
import Sidebar from './components/Sidebar';
import './index.css';

function App() {
  const isAuth = !!localStorage.getItem('token');
  const isAdmin = localStorage.getItem('role') === 'admin';

  return (
    <Router>
      <div className={isAuth ? "app-container-authenticated" : "app-container-guest"}>
        {isAuth && <Sidebar />}

        <main className={isAuth ? "main-dashboard" : "main-full"}>
          <Routes>
            {/* Rotta Principale: Landing se non loggato, Dashboard se loggato */}
            <Route path="/" element={isAuth ? <Dashboard /> : <Landing />} />

            {/* Rotte Pubbliche / Autenticazione */}
            <Route path="/login" element={isAuth ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/support" element={<Support />} />

            {/* Rotte Protette */}
            <Route path="/subscriptions" element={isAuth ? <Subscriptions /> : <Navigate to="/login" />} />
            
            <Route 
              path="/users" 
              element={isAuth ? (isAdmin ? <Users /> : <Unauthorized />) : <Navigate to="/login" />} 
            />
            
            <Route path="/analysis" element={isAuth ? <Analysis /> : <Navigate to="/login" />} />
            
            <Route 
              path="/logs" 
              element={isAuth && isAdmin ? <ActivityLog /> : <Navigate to="/" />} 
            />
            
            <Route path="/settings" element={isAuth ? <Settings /> : <Navigate to="/login" />} />

            {/* Rotta di fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;