import User from '../models/User';

class UserController {
  constructor() {}
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      res.json(novoUser);
    } catch (e) {
      //tratando o erro e exibindo a mensagem específica do erro
      res.status(400).json({
        errors: e.errors.map(err => err.message),
      });
    }
  }
}

//exportar já instanciado
export default new UserController();
