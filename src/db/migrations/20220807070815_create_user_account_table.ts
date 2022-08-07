import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("user_account", (table) => {
        table.increments("id");
        table.string("first_name");
        table.string("last_name");
        table.string("dob");
        table.string("ethnicity");
        table.string("gender");
        table.string("email").notNullable();
        table.string("password");
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("user_account");
}
