import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('symptoms_parents', (t) => {
    t.integer('symptom_id')
      .unsigned()
      .references('symptoms.symptom_id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    t.integer('parent_id')
      .unsigned()
      .references('symptoms.symptom_id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    t.integer('user_id')
      .unsigned()
      .references('users.user_id')
      .onDelete('SET NULL')
      .onUpdate('SET NULL');
    t.primary(['symptom_id', 'parent_id']);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('symptoms_parents');
}
