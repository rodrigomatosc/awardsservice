import { Router } from 'express';
import AwardsUserController from './app/controllers/AwardsUserController';
import UserController from './app/controllers/UserController';
import ColletedCoinController from './app/controllers/ColletedCoinController';
import DeadController from './app/controllers/DeadController';
import KillMonsterController from './app/controllers/KillMonsterController';

const routes = new Router();

routes.get('/awardsUsers/:id', AwardsUserController.index);
routes.get('/users', UserController.index);

routes.post('/colletedCoin', ColletedCoinController.store);
routes.post('/dead', DeadController.store);
routes.post('/killMonster', KillMonsterController.store);

export default routes;
