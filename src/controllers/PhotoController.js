//IMPORT DE MODULOS
import multer from 'multer';

//IMPORT LOCAIS
import multerConfig from '../config/multerConfig';
import Photo from '../models/Photo';

//'foto' é o nome do campo do upload no insomnia
const upload = multer(multerConfig).single('foto');

class PhotoController {
  constructor() {}
  store(req, res) {
    return upload(req, res, async error => {
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { aluno_id } = req.body;

        if (!aluno_id) {
          // Se o aluno_id não for enviado, podemos retornar um erro
          return res.status(400).json({
            errors: ['ID do aluno não enviado.'],
          });
        }

        // O await é crucial aqui.
        const foto = await Photo.create({ originalname, filename, aluno_id });

        return res.json(req.file);
      } catch (e) {
        return res.status(400).json({
          errors: e.errors
            ? e.errors.map(err => err.message)
            : ['Erro na criação da foto.'],
        });
      }
    });
  }
}

//exportar já instanciado
export default new PhotoController();
