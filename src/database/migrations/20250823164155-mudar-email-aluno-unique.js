'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Método changeColumn
    await queryInterface.changeColumn('alunos', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // Reverte a alteração
    await queryInterface.changeColumn('alunos', 'email', {
      type: Sequelize.STRING, // Retorna ao valor padrão (255) ou o valor anterior
      allowNull: false,
    });
  },
};
