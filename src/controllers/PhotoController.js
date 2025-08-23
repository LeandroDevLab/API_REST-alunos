//IMPORT DE MODULOS
import multer from 'multer';

//IMPORT LOCAIS
import multerConfig from '../config/multerConfig';

//'foto' é o nome do campo do upload no insomnia
const upload = multer(multerConfig).single('foto');

class PhotoController {
  constructor() {}
  async store(req, res) {
    return upload(req, res, error => {
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        });
      }
      return res.json(req.file);
    });
  }
}

//exportar já instanciado
export default new PhotoController();
