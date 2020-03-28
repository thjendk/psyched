import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('diagnoses', (t) => {
    t.increments('diagnosis_id');
    t.string('name');
    t.text('description');
    t.string('icd_code');
    t.integer('user_id')
      .unsigned()
      .references('users.user_id');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('diagnoses');
}
