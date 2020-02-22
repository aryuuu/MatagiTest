
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', t => {
      t.string('Name')
          .notNullable();

      t.string('IndonesianID', 16)
          .notNullable();

      t.datetime('Birthday')
          .notNullable();

      t.timestamp('createdAt')
          .defaultTo(knex.raw('CURRENT_TIMESTAMP'));

      t.timestamp('updatedAt')
          .defaultTo(knex.raw('CURRENT_TIMESTAMP'));

      t.timestamp('deletedAt')
          .defaultTo('0000-00-00 00:00:00');

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};