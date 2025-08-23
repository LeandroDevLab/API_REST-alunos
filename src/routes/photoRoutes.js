//IMPORT DE MODULOS
import { Router } from 'express';

//IMPORT LOCAIS
import photoController from '../controllers/PhotoController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, photoController.store);

export default router;
