import { Router } from 'express';
import AwardsUserController from './app/controllers/AwardsUserController';

const routes = new Router();

routes.get('/awardsUsers/:id', AwardsUserController.index);

export default routes;
