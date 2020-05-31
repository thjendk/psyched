import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('symptoms', (t) => {
    t.increments();
    t.text('name');
    t.text('description');
    t.integer('parent_id')
      .unsigned()
      .references('symptoms.id')
      .onDelete('set null')
      .onUpdate('cascade');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('symptoms');
}
