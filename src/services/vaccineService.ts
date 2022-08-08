import Success from "../domain/Success";
import Vaccine, { VaccineToInsert } from "../domain/Vaccine";
import logger from "../misc/logger";
import vaccineModel from "../models/vaccineModel";

export const getAllVaccines = async (): Promise<Success<Vaccine[]>> => {
    logger.info("Getting all vaccines");

    const vaccines = await vaccineModel.getAllVaccines();

    return {
        data: vaccines,
        message: "Vaccines fetched successfully",
    };
};

export const getVaccine = async (
    vaccineId: number
): Promise<Success<Vaccine>> => {
    logger.info(`Getting vaccine with id: ${vaccineId}`);

    const vaccine = await vaccineModel.getVaccine(vaccineId);

    return {
        data: vaccine,
        message: "Vaccine fetched successfully",
    };
};

export const createVaccine = async (
    vaccine: VaccineToInsert
): Promise<Success<Vaccine>> => {
    const insertedVaccine = await vaccineModel.createVaccine(vaccine);

    logger.info("Vaccine created successfully");

    return {
        data: insertedVaccine,
        message: "Vaccine created successfully",
    };
};

export const updateVaccine = async (
    vaccine: Vaccine
): Promise<Success<Vaccine>> => {
    const updatedVaccine = await vaccineModel.updateVaccine(vaccine);
    logger.info("Vaccine updated successfully");

    return {
        data: updatedVaccine,
        message: "Vaccine updated successfully",
    };
};

export const deleteVaccine = async (
    vaccineId: number
): Promise<Success<Vaccine>> => {
    await vaccineModel.deleteVaccine(vaccineId);

    logger.info("Vaccine deleted successfully");

    return {
        message: "Vaccine deleted successfully",
    };
};
