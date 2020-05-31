import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('groups', (t) => {
    t.increments();
    t.string('name');
    t.integer('index');
    t.integer('diagnosis_id')
      .unsigned()
      .references('diagnoses.id')
      .onDelete('set null')
      .onUpdate('cascade');
    t.integer('parent_id')
      .unsigned()
      .references('groups.id')
      .onDelete('set null')
      .onUpdate('cascade');
  });
}

export async function down(knex: Knex): Promise<any> {}
