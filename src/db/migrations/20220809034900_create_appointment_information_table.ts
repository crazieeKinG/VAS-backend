import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("appointment_information", (table) => {
        table.increments("id");
        table.integer("patient_id");
        table.string("site_location");
        table.string("service_type");
        table.string("appointment_status");
        table.foreign("patient_id").references("id").inTable("user_account").onDelete("RESTRICT").onUpdate("CASCADE");
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("appointment_information");
}
