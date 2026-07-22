const jwt = require('jsonwebtoken');

// Middleware di protezione base (verifica se loggato)
exports.protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ msg: 'Accesso non autorizzato, token mancante' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Assicurati che decoded.user contenga l'ID e il RUOLO
    req.user = decoded.user; 
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token non valido' });
  }
};

// Middleware per limitare l'accesso agli amministratori
exports.adminOnly = (req, res, next) => {
  // Verifica se req.user esiste e se il suo ruolo è admin (ignorando maiuscole/minuscole)
  if (req.user && req.user.role && req.user.role.toLowerCase() === 'admin') {
    next();
  } else {
    res.status(403).json({ msg: 'Accesso negato: solo gli amministratori possono eseguire questa operazione' });
  }
};