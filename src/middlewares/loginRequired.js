import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({
      errors: ['Login required'],
    });
  }

  // Bearer eyJdhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJqb2FvQGdtYWlsLmNvbSIsImlhdCI6MTc1NTg5MzQxOSwiZXhwIjoxNzU2NDk4MjE5fQ.WrlWx1DDY07aZHTfoVCwnwN9UPekoeA2vmZ3YkaiIQ8
  const [texto, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;
    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (e) {
    res.status(401).json({
      errors: ['Token expirado ou inválido!'],
    });
  }
};
