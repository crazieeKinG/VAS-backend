import { VACCINE_DATA_TO_SEND } from "../constants/tableConstants";
import db from "../db/db";
import Vaccine, { VaccineToInsert } from "../domain/Vaccine";
import { databaseError } from "../utils/errors";

class VaccineInformation {
    public static table = "vaccine_information";

    public static async getAllVaccines() {
        try {
            const vaccines = await db(VaccineInformation.table).select(
                VACCINE_DATA_TO_SEND
            );

            return vaccines;
        } catch (error) {
            throw databaseError;
        }
    }

    public static async createVaccine(vaccine: VaccineToInsert) {
        try {
            const newvaccine = await db(VaccineInformation.table).insert(
                vaccine,
                ["id"]
            );

            return newvaccine;
        } catch (error) {
            throw databaseError;
        }
    }

    public static async getVaccine(vaccineId: number): Promise<Vaccine> {
        try {
            const vaccine = await db(VaccineInformation.table)
                .where({ id: vaccineId })
                .select(VACCINE_DATA_TO_SEND)
                .first();

            return vaccine;
        } catch (error) {
            throw databaseError;
        }
    }

    public static async updateVaccine(vaccine: Vaccine): Promise<Vaccine> {
        try {
            const [updatedvaccine] = await db(VaccineInformation.table)
                .where({ id: vaccine.id })
                .update(vaccine)
                .returning(VACCINE_DATA_TO_SEND);

            return updatedvaccine;
        } catch (error) {
            throw databaseError;
        }
    }

    public static async deleteVaccine(vaccineId: number): Promise<void> {
        try {
            await db(VaccineInformation.table)
                .where({ id: vaccineId })
                .delete();
        } catch (error) {
            throw databaseError;
        }
    }
}

export default VaccineInformation;
