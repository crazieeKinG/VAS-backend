import { VACCINE_DATA_TO_SEND } from "../constants/tableConstants";
import db from "../db/db";
import Vaccine, { VaccineToInsert } from "../domain/Vaccine";

class VaccineInformation {
    public static table = "vaccine_information";

    public static async getAllVaccines() {
        const vaccines = await db(VaccineInformation.table).select(
            VACCINE_DATA_TO_SEND
        );

        return vaccines;
    }

    public static async createVaccine(vaccine: VaccineToInsert) {
        const { startDate, endDate } = vaccine;

        const newvaccine = await db(VaccineInformation.table).insert(
            {
                ...vaccine,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
            },
            ["id"]
        );

        return newvaccine;
    }

    public static async getVaccine(vaccineId: number): Promise<Vaccine> {
        const vaccine = await db(VaccineInformation.table)
            .where({ id: vaccineId })
            .select(VACCINE_DATA_TO_SEND)
            .first();

        return vaccine;
    }

    public static async updateVaccine(vaccine: Vaccine): Promise<Vaccine> {
        const { startDate, endDate } = vaccine;

        const [updatedvaccine] = await db(VaccineInformation.table)
            .where({ id: vaccine.id })
            .update({
                ...vaccine,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
            })
            .returning(VACCINE_DATA_TO_SEND);

        return updatedvaccine;
    }

    public static async deleteVaccine(vaccineId: number): Promise<void> {
        await db(VaccineInformation.table).where({ id: vaccineId }).delete();
    }
}

export default VaccineInformation;
