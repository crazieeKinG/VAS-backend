import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("vaccine_information", (table) => {
        table.increments("id");
        table.string("service_name").notNullable();
        table.string("site_location").notNullable();
        table.date("start_date").notNullable();
        table.date("end_date").notNullable();
        table.integer("number_of_doses").notNullable();
        table.string("gender").notNullable();
        table.integer("age").notNullable();
        table.string("ethnicity").notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("vaccine_information");
}
