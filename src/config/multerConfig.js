import multer from 'multer';
import { extname, resolve } from 'path';
//extname vai pegar o nome da extensão do arquivo

const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);

export default {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      // no 1º parametro é um erro, no 2º o caminho
      cb(null, resolve(__dirname, '..', '..', 'uploads'));
    },
    filename: (req, file, cb) => {
      // no 1º parametro é um erro, no 2º o nome, composto por (data em ms)+(num aleatorio)
      cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`);
    },
  }),
};
