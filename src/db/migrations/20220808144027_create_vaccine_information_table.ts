import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("vaccine_information", (table) => {
        table.increments("id");
        table.string("service_name");
        table.string("site_location");
        table.date("start_date");
        table.date("end_date");
        table.integer("number_of_doses");
        table.string("gender");
        table.integer("age");
        table.string("ethnicity");
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("vaccine_information");
}
