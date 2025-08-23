//IMPORT DE MODULOS
import { Router } from 'express';

//IMPORT LOCAIS

import tokenController from '../controllers/TokenController';

const router = new Router();

router.post('/', tokenController.store);

export default router;
