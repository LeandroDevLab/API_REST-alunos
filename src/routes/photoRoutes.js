//IMPORT DE MODULOS
import { Router } from 'express';

//IMPORT LOCAIS
import photoController from '../controllers/PhotoController';

const router = new Router();

router.post('/', photoController.store);

export default router;
