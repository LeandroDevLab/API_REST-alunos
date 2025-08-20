/*
//poderia dessa forma
import express from 'express';
const router = new express.Router();
*/

import { Router } from 'express';
import homeController from '../controllers/HomeController';

const router = new Router();

router.get('/', homeController.index);

export default router;
