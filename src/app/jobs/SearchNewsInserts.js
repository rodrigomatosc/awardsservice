import Redis from '../../lib/Redis';
import { promisify } from 'util';
import Queue from '../../lib/Queue';

import CollectedCoinSchema from '../schemas/ColletedConins';
import DeathsSchema from '../schemas/Deaths';
import KilledMonstersSchema from '../schemas/KilledMonsters';

import CollectedCoin from '../models/CollectedCoin';
import Deaths from '../models/Deaths';
import KilledMonster from '../models/KilledMonster';

import CollectedCoinsJob from './CollectedCoinsJob';
import DeathsJob from './DeathsJob';
import KilledMonstersJob from './killedMonstersJob';
import { Op } from 'sequelize';

class SearchNewsInserts {
  start = async () => {
    // await Redis.set('SEARCH_COLLECTED_COINS', JSON.stringify(0));
    // await Redis.set('SEARCH_KILL_MONSTER', JSON.stringify(0));
    // await Redis.set('SEARCH_DEATHS', JSON.stringify(0));
    console.time('Processo Search');
    this.killedMonsters();
    this.collectedCoins();
    this.deaths();
    console.timeEnd('Processo Search');
  };

  async collectedCoins() {
    // Recuperando o ultimo id inserido
    const getAsync = promisify(Redis.get);
    const lastIdColleted = await getAsync
      .call(Redis, 'SEARCH_COLLECTED_COINS')
      .then(result => result);

    let where = [];
    if (lastIdColleted) {
      where = {
        id: { [Op.gt]: lastIdColleted },
      };
    }

    // Recuperando as moedas inseridas
    const coins = await CollectedCoin.findAll({ where, limit: 1000 });
    let lastIdInserted = 0;
    let users = [];

    // Salvando no mongo os ids
    for (let coin of coins) {
      lastIdInserted = lastIdInserted < coin.id ? coin.id : lastIdInserted;
      users.push(coin.user_id);
      await CollectedCoinSchema.findOneAndUpdate(
        { user: coin.user_id },
        { $inc: { value: coin.value } },
        { upsert: true, new: true }
      );
    }

    // Inserindo os dados no Redis
    if (coins.length > 0) {
      await Redis.set('SEARCH_COLLECTED_COINS', JSON.stringify(lastIdInserted));
      Queue.add(CollectedCoinsJob.key, { users: [...new Set(users)] });
    }
  }

  async killedMonsters() {
    // Recuperando o ultimo id inserido
    const getAsync = promisify(Redis.get);
    const lastIdColleted = await getAsync
      .call(Redis, 'SEARCH_KILL_MONSTER')
      .then(result => result);

    let where = [];
    if (lastIdColleted) {
      where = {
        id: { [Op.gt]: lastIdColleted },
      };
    }

    // Recuperando as mortes inseridas
    const murders = await KilledMonster.findAll({ where, limit: 1000 });
    let lastIdInserted = 0;
    let usersAndMonsters = [];

    // Salvando no mongo os ids
    for (let murder of murders) {
      lastIdInserted = lastIdInserted < murder.id ? murder.id : lastIdInserted;
      usersAndMonsters.push({
        user: murder.user_id,
        monster: murder.monster_id,
      });

      await KilledMonstersSchema.findOneAndUpdate(
        { user: murder.user_id, monster: murder.monster_id },
        { $inc: { value: 1 } },
        { upsert: true, new: true }
      );
    }

    // Inserindo os dados no Redis
    if (murders.length > 0) {
      await Redis.set('SEARCH_KILL_MONSTER', JSON.stringify(lastIdInserted));
      Queue.add(KilledMonstersJob.key, {
        usersAndMonsters: usersAndMonsters,
      });
    }
  }

  async deaths() {
    // Recuperando o ultimo id inserido
    const getAsync = promisify(Redis.get);
    const lastIdColleted = await getAsync
      .call(Redis, 'SEARCH_DEATHS')
      .then(result => result);

    let where = [];
    if (lastIdColleted) {
      where = {
        id: { [Op.gt]: lastIdColleted },
      };
    }

    // Recuperando as moedas inseridas
    const deaths = await Deaths.findAll({ where, limit: 1000 });
    let lastIdInserted = 0;
    let users = [];
    let values = [];

    // Salvando no mongo os ids
    for (let death of deaths) {
      lastIdInserted = lastIdInserted < death.id ? death.id : lastIdInserted;
      users.push(death.user_id);
      const teste = await DeathsSchema.findOneAndUpdate(
        { user: death.user_id },
        { $inc: { value: 1 } },
        { upsert: true, new: true }
      );
    }

    // Inserindo os dados no Redis
    if (deaths.length > 0) {
      await Redis.set('SEARCH_DEATHS', JSON.stringify(lastIdInserted));
      Queue.add(DeathsJob.key, { users: [...new Set(users)] });
    }
  }
}

export default new SearchNewsInserts();
