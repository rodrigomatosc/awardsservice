import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import databaseConfig from '../config/database';
import User from '../app/models/User';
import KilledMonster from '../app/models/KilledMonster';
import CollectedCoin from '../app/models/CollectedCoin';
import Monster from '../app/models/Monster';
import Deaths from '../app/models/Deaths';
import CategoryAward from '../app/models/CategoryAward';
import Award from '../app/models/Award';
import UserAward from '../app/models/UserAward';

const models = [
  UserAward,
  User,
  Monster,
  KilledMonster,
  CollectedCoin,
  Deaths,
  CategoryAward,
  Award,
];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/awards',
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    );
  }
}

export default new Database();
