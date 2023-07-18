/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item').del()
  await knex('item').insert([
    {userid: 2, itemname: 'Tennis Racket', 
    description: 'New for 2021, the Bomboclat Pure Drive 25 junior racquet features a striking blue cosmetic graphic update. This is a great racquet for players between the ages of 8-10 and juniors approximately 50-55 inches tall.', 
    quantity: 4},
    {userid: 2, itemname: 'Tennis Shoes', 
    description: 'Introducing the Vapor 11 Men\'s Tennis Shoe in the London White/Kelly Green colorway, a shoe that has been validated by the legends of the game who swear by its unparalleled ethos and velocity. This latest edition is back and better than ever, ready to elevate your performance on the court.', 
    quantity: 15},
    {userid: 2, itemname: 'Tennis Balls (Case)', 
    description: 'Unparalleled consistency and performance make it the gold standard in tennis, trusted by the best in the game when it\'s all on the line. The Wilson US Open Extra Duty tennis ball is crafted with premium woven felt.', 
    quantity: 50},
  ]);
  await knex.raw('SELECT setval(\'item_id_seq\', (SELECT MAX(id) from "item"));')
};
