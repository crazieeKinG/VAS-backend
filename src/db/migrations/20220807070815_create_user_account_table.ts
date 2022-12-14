import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("user_account", (table) => {
        table.increments("id");
        table.string("first_name").notNullable();
        table.string("last_name").notNullable();
        table.string("dob").notNullable();
        table.string("ethnicity").notNullable();
        table.string("gender").notNullable();
        table.string("email").unique().notNullable();
        table.string("password").notNullable();
        table.string("state").notNullable();
        table.string("city").notNullable();
        table.string("street").notNullable();
        table.string("insurance_id").notNullable();
        table.string("insurance_provider").notNullable();
        table.string("member_id").notNullable();
        table.string("document_url").notNullable();
        table.boolean("is_admin").notNullable().defaultTo(false);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("user_account");
}
