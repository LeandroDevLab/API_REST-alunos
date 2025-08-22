import User from '../models/User';

class UserController {
  constructor() {}
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      return res.json(novoUser);
    } catch (e) {
      //tratando o erro e exibindo a mensagem específica do erro
      return res.status(400).json({
        errors: e.errors.map(err => err.message),
      });
    }
  }

  //INDEX
  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  }
  //SHOW
  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      return res.json(user);
    } catch (e) {
      return res.json(null);
    }
  }

  //UPDATE
  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          errors: ['ID não enviado.'],
        });
      }

      const user = await User.findByPk(id);

      if (!user) {
        res.status(400).json({
          errors: ['Usuário não existe.'],
        });
      }

      const novosDados = await user.update(req.body);
      return res.json(user);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message),
      });
    }
  }

  //DELETE
  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          errors: ['ID não enviado.'],
        });
      }

      const user = await User.findByPk(id);

      if (!user) {
        res.status(400).json({
          errors: ['Usuário não existe.'],
        });
      }

      await user.destroy();
      return res.json(user);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message),
      });
    }
  }
}

//exportar já instanciado
export default new UserController();
