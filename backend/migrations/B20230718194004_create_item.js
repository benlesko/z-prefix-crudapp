/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
      .createTable('item', (table)=> {
          table.increments('id');
          table.integer('userid');
          table.string('itemname');
          table.text('description');
          table.integer('quantity');

          table.foreign('userid').references('id').inTable('user').onDelete('cascade');
      })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.alterTable('item', table => {
      table.dropForeign('userid')
    })
    .then(function() {
       return knex.schema.dropTableIfExists('item')
    });
   };