import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('diagnoses', (t) => {
    t.increments();
    t.text('name');
    t.text('description');
    t.string('icd_code');
    t.integer('parent_id')
      .unsigned()
      .references('diagnoses.id')
      .onDelete('set null')
      .onUpdate('cascade');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('diagnoses');
}
