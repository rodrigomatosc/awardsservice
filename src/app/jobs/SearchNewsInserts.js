import Redis from '../../lib/Redis';
import CollectedCoin from '../models/CollectedCoin';
import CollectedCoinSchema from '../schemas/ColletedConins';
import { promisify } from 'util';
import { Op } from 'sequelize';
import Queue from '../../lib/Queue';
import CollectedCoinsJob from './CollectedCoinsJob';

class SearchNewsInserts {
  start = () => {
    this.collectedCoins();
  };

  async collectedCoins() {
    // Recuperando o ultimo id inserido
    const getAsync = promisify(Redis.get);
    const lastIdColleted = await getAsync
      .call(Redis, 'SEARCH_COLLECTED_COINS')
      .then(result => result);

    let where = [];
    // if (lastIdColleted) {
    //   where = {
    //     id: { [Op.gt]: lastIdColleted },
    //   };
    // }

    // Recuperando as moedas inseridas
    const coins = await CollectedCoin.findAll({ where, limit: 1000 });
    let lastIdInserted = 0;
    let users = [];

    // Salvando no mongo os ids
    coins.forEach(async coin => {
      lastIdInserted = lastIdInserted < coin.id ? coin.id : lastIdInserted;
      users.push(coin.user_id);
      await CollectedCoinSchema.findOneAndUpdate(
        { user: coin.user_id },
        { $inc: { value: coin.value } },
        { upsert: true }
      );
    });

    // Inserindo os dados no Redis
    if (coins.length > 0) {
      await Redis.set('SEARCH_COLLECTED_COINS', JSON.stringify(lastIdInserted));
      Queue.add(CollectedCoinsJob.key, { users: [...new Set(users)] });
    }
  }

  async killedMonsters() {}

  async deaths() {}
}

export default new SearchNewsInserts();
