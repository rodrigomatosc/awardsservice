import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        avatar: Sequelize.STRING,
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

export default User;
