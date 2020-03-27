import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('diagnosis_symptoms', (t) => {
    t.integer('symptom_id')
      .unsigned()
      .references('symptoms.symptom_id')
      .onDelete('cascade')
      .onUpdate('cascade');
    t.integer('diagnosis_id')
      .unsigned()
      .references('diagnoses.diagnosis_id')
      .onDelete('cascade')
      .onUpdate('cascade');
    t.primary(['symptom_id', 'diagnosis_id']);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('diagnosis_symptoms');
}
