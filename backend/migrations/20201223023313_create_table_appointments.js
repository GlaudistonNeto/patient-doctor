
exports.up = function(knex) {
  return knex.schema.createTable('appointments', table => {
    table.increments('id').primary()
    table.integer('userId').references('id')
      .inTable('users')
    table.string('regarding').notNull()
    table.string('description', 1000).notNull()
    table.string('day').notNull()
    table.string('time').notNull()
    table.integer('categoryId').references('id')
      .inTable('categories').notNull()
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('appointments');
};
