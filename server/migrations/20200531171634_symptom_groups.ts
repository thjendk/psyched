import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('symptom_groups', (t) => {
    t.integer('symptom_id')
      .unsigned()
      .references('symptoms.id')
      .onDelete('cascade')
      .onUpdate('cascade');
    t.integer('group_id')
      .unsigned()
      .references('groups.id')
      .onDelete('cascade')
      .onUpdate('cascade');
    t.primary(['symptom_id', 'group_id']);
  });
}

export async function down(knex: Knex): Promise<any> {}
