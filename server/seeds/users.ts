import * as Knex from 'knex';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        { user_id: 1, username: 'user', password: bcrypt.hashSync('password', 10) }
      ]);
    });
}
