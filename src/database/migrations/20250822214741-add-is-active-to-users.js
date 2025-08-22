'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Adiciona a coluna 'is_active' à tabela 'users'
    await queryInterface.addColumn('users', 'is_active', {
      type: Sequelize.BOOLEAN,
      defaultValue: true, // Garante que todos os usuários existentes sejam definidos como ativos por padrão
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove a coluna 'is_active' se a migração for revertida
    await queryInterface.removeColumn('users', 'is_active');
  },
};
