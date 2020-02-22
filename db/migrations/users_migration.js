
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', t => {
      t.string('Name')
          .notNullable();
      t.string('IndonesianID')
          .notNullable();
      t.datetime('Birthday')
          .notNullable();
      t.timestamp('createdAt');
      t.timestamp('updatedAt');
      t.timestamp('deletedAt')

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};