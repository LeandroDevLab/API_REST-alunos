//IMPORT DE MODULOS
import { Router } from 'express';

//IMPORT LOCAIS
import userController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';
import adminRequired from '../middlewares/adminRequired';

const router = new Router();

//não deve existir para o usuário (só administradores)

//🏀 CRIADO um middleware de segurança 🏀
router.get('/admin', adminRequired, userController.index); // Lista todos usuário
router.get('/admin/:id', adminRequired, userController.show); // Lista um usuário
router.put('/admin/:id', adminRequired, userController.updateDoAdmin);

//São reais -> necessários
router.post('/', userController.store);
router.put('/', loginRequired, userController.update);

//esqueci de umar a rota aqui, nunca iria chegar esse put, pois
//executaria o outro primeiro (😅)
router.put('/delete', loginRequired, userController.delete);

export default router;
