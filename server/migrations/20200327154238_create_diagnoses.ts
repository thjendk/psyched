import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('diagnoses', (t) => {
    t.increments();
    t.text('name');
    t.text('description');
    t.string('icd_code');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('diagnoses');
}
