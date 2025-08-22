import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  constructor() {}
  async store(req, res) {
    const { email = '', password = '' } = req.body;
    //console.log(email, password);

    if (!email || !password) {
      return res.status(401).json({
        errors: ['Credenciais inválidas!'],
      });
    }

    const user = await User.findOne({ where: { email: email } }); // como chave e valor são igual poderia deixar só a chave

    if (!user) {
      return res.status(401).json({
        errors: ['Usuário não existe!'],
      });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Senha Inválida!'],
      });
    }
    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return res.json({ token });
  }
}

//exportar já instanciado
export default new TokenController();
