//IMPORT DE MODULOS
import { Router } from 'express';
import multer from 'multer';

//IMPORT LOCAIS
import photoController from '../controllers/PhotoController';
import multerConfig from '../config/multerConfig';

const upload = multer(multerConfig);

const router = new Router();

//'foto' é o nome do campo do upload no insomnia
router.post('/', upload.single('foto'), photoController.store);

export default router;
