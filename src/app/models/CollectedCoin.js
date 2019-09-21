import Sequelize, { Model } from 'sequelize';

class CollectedCoin extends Model {
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
  }
}

export default CollectedCoin;
