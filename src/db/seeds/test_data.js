/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('USER').del();
  await knex('USER').insert([
    { name: 'user1', email: 'abc@mail.com', password: 'abc' },
    { name: 'user2', email: 'def@mail.com', password: 'def' },
    { name: 'user3', email: 'ghi@mail.com', password: 'ghi' },
  ]);
};
