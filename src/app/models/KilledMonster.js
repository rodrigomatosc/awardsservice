import Sequelize, { Model } from 'sequelize';

class KilledMonster extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Monster, { foreignKey: 'monster_id' });
  }
}

export default KilledMonster;
