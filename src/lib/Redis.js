import RedisLib from 'redis';
import ConfigRedis from '../config/redis';

class Redis {
  constructor() {
    const { host, port } = ConfigRedis;
    this.client = RedisLib.createClient(port, host);
  }
}

export default new Redis().client;
