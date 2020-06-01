import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('diagnosis_parents', (t) => {
    t.integer('diagnosis_id')
      .unsigned()
      .references('diagnoses.id')
      .onDelete('cascade')
      .onUpdate('cascade');
    t.integer('parent_id')
      .unsigned()
      .references('diagnoses.id')
      .onDelete('cascade')
      .onUpdate('cascade');
    t.primary(['diagnosis_id', 'parent_id']);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('diagnosis_parents');
}
