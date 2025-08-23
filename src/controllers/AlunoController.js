import Aluno from '../models/Aluno';

class HomeController {
  constructor() {}
  async index(req, res) {
    const alunos = await Aluno.findAll();
    return res.json(alunos);
  }
}

//exportar já instanciado
export default new HomeController();

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
