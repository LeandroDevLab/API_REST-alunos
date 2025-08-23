'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(
      'users_novo',
      [
        {
          nome: 'John1 Doe',
          email: 'johndoe1@gmail.com',
          password_hash: await bcrypt.hash('123456', 8), //8 é o tamanho do hash
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'John2 Doe',
          email: 'johndoe2@gmail.com',
          password_hash: await bcrypt.hash('123456', 8), //8 é o tamanho do hash
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'John3 Doe',
          email: 'johndoe3@gmail.com',
          password_hash: await bcrypt.hash('123456', 8), //8 é o tamanho do hash
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    // É uma boa prática remover os dados de teste em caso de rollback
    //return queryInterface.bulkDelete('users_novo', null, {});
  },
};
