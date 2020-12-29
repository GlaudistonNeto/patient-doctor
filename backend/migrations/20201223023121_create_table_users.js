
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary()
    table.string('name').notNull()
    table.string('email').notNull().unique()
    table.string('password').notNull()
    table.string('alternateNum').notNull().defaultTo('pending')
    table.string('paitentRefNo').nullable().defaultTo('pending')	
    table.string('landlineNo').notNull().defaultTo('pending')
    table.string('mobileNo').notNull().defaultTo('pending')
    table.string('address').notNull().defaultTo('pending')
    table.string('gender').notNull().defaultTo('pending')
    table.string('country').notNull().defaultTo('pending')
    table.string('dob').notNull().defaultTo('pending')
    table.string('state').notNull().defaultTo('pending')
    table.string('age').notNull().defaultTo('pending')
    table.string('city').notNull().defaultTo('pending')
    table.string('dentition').nullable().defaultTo('pending')
    table.string('pincode').notNull().defaultTo('pending')
    table.string('bloodGroup').nullable().defaultTo('pending')
    table.string('qualification', 1000).nullable().defaultTo('pending')
    table.string('imageUrl', 1000).nullable().defaultTo('pending')
    table.boolean('doctor').notNull().defaultTo(false)
    table.boolean('receptionist').notNull().defaultTo(false)
    table.boolean('admin').notNull().defaultTo(false)
})
};

exports.down = function (knex, Promise) {
return knex.schema.dropTable('users')
};
