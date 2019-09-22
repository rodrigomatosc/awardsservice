'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('awards', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      subcategory_id: {
        type: Sequelize.INTEGER,
        references: { model: 'subcategory_awards', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      monster_id: {
        type: Sequelize.INTEGER,
        references: { model: 'monsters', key: 'id' },
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      value: {
        type: Sequelize.DOUBLE(11),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('awards');
  },
};
