import Sequelize, { Model } from 'sequelize';

class Monster extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

export default Monster;
