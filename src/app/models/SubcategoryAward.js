import Sequelize, { Model } from 'sequelize';

class SubcategoryAward extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.CategoryAward, { foreignKey: 'category_id' });
  }
}

export default SubcategoryAward;
