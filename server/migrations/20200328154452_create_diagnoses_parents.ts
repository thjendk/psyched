import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('diagnoses_parents', (t) => {
    t.integer('diagnosis_id')
      .unsigned()
      .references('diagnoses.diagnosis_id');
    t.integer('parent_id')
      .unsigned()
      .references('diagnoses.diagnosis_id');
    t.integer('user_id')
      .unsigned()
      .references('users.user_id');
    t.primary(['diagnosis_id', 'parent_id']);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('diagnoses_parents');
}
