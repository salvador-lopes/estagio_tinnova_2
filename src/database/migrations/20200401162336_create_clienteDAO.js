
exports.up = function(knex) {
  return knex.schema.createTable('clientes', (table) =>{
      table.string('id').notNullable();
      table.string('nome').notNullable();
      table.decimal('saldo_inicial').notNullable();
      table.string('senha',4).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('clientes');
};
