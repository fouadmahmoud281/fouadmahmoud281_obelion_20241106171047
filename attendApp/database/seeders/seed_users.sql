module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [
    {
      username: 'JohnDoe',
      email: 'john.doe@example.com',
      password: 'hashed_password_1'
    },
    {
      username: 'JaneDoe',
      email: 'jane.doe@example.com',
      password: 'hashed_password_2'
    }
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {})
};
