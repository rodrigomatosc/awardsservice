import Sequelize, { Model } from 'sequelize';

class Monster extends Model {
  static init(sequelize) {
    super.init(
      {
        value: Sequelize.DOUBLE,
      },
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

export default Monster;
