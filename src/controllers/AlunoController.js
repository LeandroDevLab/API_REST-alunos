import Aluno from '../models/Aluno';

class AlunoController {
  constructor() {}

  //INDEX -> listar todos os alunos
  async index(req, res) {
    const alunos = await Aluno.findAll();
    return res.json(alunos);
  }

  //STORE -> criar um aluno
  async store(req, res) {
    try {
      const aluno = await Aluno.create(req.body);

      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message),
      });
    }
  }

  //SHOW -> exibir um aluno
  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID missing'],
        });
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Student does not exist'],
        });
      }

      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message),
      });
    }
  }

  //UPDATE -> atualizar um aluno
  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID missing'],
        });
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Student does not exist'],
        });
      }

      const alunoAtualizado = await aluno.update(req.body);

      return res.json(alunoAtualizado);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message),
      });
    }
  }

  //DELETE -> deletar um aluno
  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID missing'],
        });
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Student does not exist'],
        });
      }

      await aluno.destroy();

      return res.json([
        {
          apagado: true,
        },
        {
          msg: 'Data has been deleted',
        },
      ]);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message),
      });
    }
  }
}

//exportar já instanciado
export default new AlunoController();

/* Geralmente cada Controller vai ter aproximadamente 5 métodos

Padrão de mercado

index -> lista todos os usuários (GET)
store/create -> cria um novo usuário (POST)
delete -> apaga um usuário (DELETE)
show -> mostra um usuário (GET)
update -> atualiza um usuário (PATCH: só um valor | PUT: todos os campos)

Se tiver mais do que isso, provavelmente está atribuindo mais ações que
esse Controller precisa, talz seja melhor criar um novo Controller
Específico para ação e local desejado!

*/
