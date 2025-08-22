import { Router } from 'express';
import userController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

//não deve existir para o usuário (só administradores)

//❌❌❌ criar um middleware de segurança antes ❌❌❌
//router.get('/', userController.index); // Lista todos usuário
//router.get('/:id', userController.show); // Lista um usuário
//❌❌❌ lembrar de incrementar antes ❌❌❌
//router.put('/admin/:id', userController.updateDoAdmin);

//São reais -> necessários
router.post('/', userController.store);
router.put('/', loginRequired, userController.update);

//esqueci de umar a rota aqui, nunca iria chegar esse put, pois
//executaria o outro primeiro (😅)
router.put('/delete', loginRequired, userController.delete);

export default router;
