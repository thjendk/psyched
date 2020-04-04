import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.alterTable('diagnosis_symptoms', (t) => {
    t.integer('hidden', 1).defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.alterTable('diagnosis_symptoms', (t) => {
    t.dropColumn('hidden');
  });
}
