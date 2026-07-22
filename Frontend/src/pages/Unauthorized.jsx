import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  useEffect(() => {
    alert("Non hai i permessi necessari per accedere a questa pagina.");
    navigate('/');
  }, [navigate]);

  return null; // Non renderizza nulla perché reindirizza subito
};

export default Unauthorized;