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

  const [texto, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    // Busca o usuário no banco de dados
    // e já verifica se ele é um administrador na mesma consulta.
    const user = await User.findOne({
      where: {
        id,
        email,
        is_admin: true,
      },
    });

    if (!user) {
      // Se a consulta não encontrou um usuário com 'is_admin: true',
      // o acesso é negado.
      return res.status(401).json({
        errors: ['Acesso negado: Usuário não é um administrador.'],
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
