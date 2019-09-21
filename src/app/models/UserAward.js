import { Model } from 'sequelize';

class UserAward extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Award, { foreignKey: 'awards_id' });
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}

export default UserAward;
