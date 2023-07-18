/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert([
    {id: 1, firstname: 'admin', lastname: 'mcadmin', username: 'admin', password: 'password'},
    {id: 2, firstname: 'Ben', lastname: 'Lesko', username: 'blesko', password: 'password'}
  ]);
  await knex.raw('SELECT setval(\'user_id_seq\', (SELECT MAX(id) from "user"));')
};
