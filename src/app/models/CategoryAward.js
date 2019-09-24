import Sequelize, { Model } from 'sequelize';

class CategoryAward extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        image: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

export default CategoryAward;
