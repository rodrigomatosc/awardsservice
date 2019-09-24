import Sequelize, { Model } from 'sequelize';

class Award extends Model {
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
    this.belongsTo(models.CategoryAward, { foreignKey: 'category_id' });
    this.belongsTo(models.Monster, { foreignKey: 'monster_id' });
    this.hasMany(models.UserAward, { foreignKey: 'awards_id' });
  }
}

export default Award;
