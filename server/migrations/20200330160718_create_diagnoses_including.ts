import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('diagnoses_including', (t) => {
    t.integer('diagnosis_id')
      .unsigned()
      .references('diagnoses.diagnosis_id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    t.integer('including_id')
      .unsigned()
      .references('diagnoses.diagnosis_id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    t.integer('user_id')
      .unsigned()
      .references('users.user_id')
      .onDelete('SET NULL')
      .onUpdate('SET NULL');
    t.primary(['diagnosis_id', 'including_id']);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('diagnoses_including');
}
