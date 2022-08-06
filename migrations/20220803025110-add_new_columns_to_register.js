'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn(
        'registers',
        'gender', 
        {
          type: Sequelize.STRING(1)
        }),

      queryInterface.addColumn(
        'registers',
        'email', 
        {
          type: Sequelize.STRING,
          unique: true
        }),

      queryInterface.addColumn(
        'registers',
        'password', 
        {
          type: Sequelize.STRING,
        }),

      queryInterface.addColumn(
        'registers',
        'number', 
        {
          type: Sequelize.INTEGER,
          unique: true
        })

    ])
    

      
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('registers', 'gender');
    await queryInterface.removeColumn('registers', 'email');
    await queryInterface.removeColumn('registers', 'password');
    await queryInterface.removeColumn('registers', 'number');
  }
};
