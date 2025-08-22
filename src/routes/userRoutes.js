/*
//poderia dessa forma
import express from 'express';
const router = new express.Router();
*/

import { Router } from 'express';
import userController from '../controllers/UserController';

const router = new Router();

router.post('/', userController.store);

export default router;
