import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('symptoms', (t) => {
    t.increments('symptom_id');
    t.string('name');
    t.text('description');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('symptoms');
}
