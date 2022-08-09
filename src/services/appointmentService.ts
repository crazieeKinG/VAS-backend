import Success from "../domain/Success";
import Appointment, { AppointmentToInsert } from "../domain/Appointment";
import logger from "../misc/logger";
import appointmentModel from "../models/appointmentModel";

export const getAllAppointments = async (): Promise<Success<Appointment[]>> => {
    logger.info("Getting all appointments");

    const appointments = await appointmentModel.getAllAppointments();

    return {
        data: appointments,
        message: "Appointments fetched successfully",
    };
};

export const getAppointment = async (
    appointmentId: number
): Promise<Success<Appointment>> => {
    logger.info(`Getting appointment with id: ${appointmentId}`);

    const appointment = await appointmentModel.getAppointment(appointmentId);

    return {
        data: appointment,
        message: "Appointment fetched successfully",
    };
};

export const createAppointment = async (
    appointment: AppointmentToInsert
): Promise<Success<Appointment>> => {
    const insertedAppointment = await appointmentModel.createAppointment(appointment);

    logger.info("Appointment created successfully");

    return {
        data: insertedAppointment,
        message: "Appointment created successfully",
    };
};

export const updateAppointment = async (
    appointment: Appointment
): Promise<Success<Appointment>> => {
    const updatedAppointment = await appointmentModel.updateAppointment(appointment);
    logger.info("Appointment updated successfully");

    return {
        data: updatedAppointment,
        message: "Appointment updated successfully",
    };
};

export const deleteAppointment = async (
    appointmentId: number
): Promise<Success<Appointment>> => {
    await appointmentModel.deleteAppointment(appointmentId);

    logger.info("Appointment deleted successfully");

    return {
        message: "Appointment deleted successfully",
    };
};
