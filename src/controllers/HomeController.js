import Aluno from '../models/Aluno';

class HomeController {
  constructor() {}
  async index(req, res) {
    const novoAluno = await Aluno.create({
      nome: 'Leandro',
      sobrenome: 'Oliota',
      email: 'prof.oliota@gmail.com',
      idade: 39,
      peso: 119.2,
      altura: 2.08,
    });
    res.json(novoAluno);
  }
}

//exportar já instanciado
export default new HomeController();
