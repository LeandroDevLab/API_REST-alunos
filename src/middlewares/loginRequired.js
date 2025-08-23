//IMPORT DE MODULOS
import jwt from 'jsonwebtoken';

//IMPORT LOCAIS
import User from '../models/User';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Login required'],
    });
  }

  // Bearer eyJdhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJqb2FvQGdtYWlsLmNvbSIsImlhdCI6MTc1NTg5MzQxOSwiZXhwIjoxNzU2NDk4MjE5fQ.WrlWx1DDY07aZHTfoVCwnwN9UPekoeA2vmZ3YkaiIQ8
  const [texto, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    // Busca o usuário no banco de dados
    // e já verifica se ele é uma conta ativa na mesma consulta.
    const user = await User.findOne({
      where: {
        id,
        email,
        is_active: true,
      },
    });

    if (!user) {
      // Se a consulta não encontrou um usuário com 'is_active: true',
      // o acesso é negado.
      return res.status(401).json({
        errors: ['Usuário inválido!'],
      });
    }

    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido!'],
    });
  }
};
