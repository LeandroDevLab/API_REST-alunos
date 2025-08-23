import User from '../models/User';

class UserController {
  constructor() {}
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      const { id, nome, email, is_active } = novoUser;
      return res.json({ id, nome, email, is_active });
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
      const users = await User.findAll({
        attributes: ['id', 'nome', 'email', 'is_active'],
      });

      if (users.is_admin === 'false') {
        // Retorna aqui para sair da função
        return res.status(400).json({
          errors: ['Acesso negado! Usuário é administrador!.'],
        });
      }

      //console.log('USER ID', req.userId);
      //console.log('USER EMAIL', req.userEmail);
      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  }
  //SHOW
  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      if (user.is_admin === 'false') {
        // Retorna aqui para sair da função
        return res.status(400).json({
          errors: ['Acesso negado! Usuário é administrador!.'],
        });
      }

      const { id, nome, email, is_active } = user;
      return res.json({ id, nome, email, is_active });
    } catch (e) {
      return res.json(null);
    }
  }

  //UPDATE
  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        // Retorna aqui para sair da função
        return res.status(400).json({
          errors: ['Usuário não existe.'],
        });
      }

      const novosDados = await user.update(req.body);
      const { id, nome, email, is_active } = novosDados;

      // Retorna aqui também
      return res.json({ id, nome, email, is_active });
    } catch (e) {
      // E retorna aqui também
      return res.status(400).json({
        errors: e.errors
          ? e.errors.map(err => err.message)
          : ['Erro na atualização.'],
      });
    }
  }

  //DELETE
  async delete(req, res) {
    try {
      // como está passando pelo middleware de loginRequired eu pego pelo req.userId
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe.'],
        });
      }

      // Altera a flag para 'false' em vez de apagar o registro
      const novosDados = await user.update({ is_active: false });
      const { id, nome, email, is_active } = novosDados;

      return res.json({
        message:
          'Sua conta foi desativada com sucesso. Você não poderá mais fazer login.',
        user: { id, nome, email, is_active }, // Você pode retornar a mensagem e o objeto atualizado
      });
      //em vez do usuário se deletar eu poderia editar um flag de ativo
      // e inativo e alterando essa tag ele nao faria mais login e não
      // apagaria seus dados do banco de dados, seria um falso delete e
      // eu como administrador posso recuperar
      //await user.destroy();
      //return res.json(user);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message),
      });
    }
  }

  //UPDATE do Admin
  async updateDoAdmin(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      if (user.is_admin === 'false') {
        // Retorna aqui para sair da função
        return res.status(400).json({
          errors: ['Acesso negado! Usuário é administrador!.'],
        });
      }

      const novosDados = await user.update(req.body);
      const { id, nome, email, is_active } = novosDados;

      // Retorna aqui também
      return res.json({ id, nome, email, is_active });
    } catch (e) {
      // E retorna aqui também
      return res.status(400).json({
        errors: e.errors
          ? e.errors.map(err => err.message)
          : ['Erro na atualização.'],
      });
    }
  }
}

//exportar já instanciado
export default new UserController();
