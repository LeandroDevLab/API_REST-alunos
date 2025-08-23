/*
//poderia dessa forma
import express from 'express';
const router = new express.Router();
*/
//IMPORT DE MODULOS
import { Router } from 'express';

//IMPORT LOCAIS
import homeController from '../controllers/HomeController';

const router = new Router();

router.get('/', homeController.index);

export default router;
