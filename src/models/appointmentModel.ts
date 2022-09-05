import { APPOINTMENT_DATA_TO_SEND } from "../constants/tableConstants";
import db from "../db/db";
import Appointment, { AppointmentToInsert } from "../domain/Appointment";
import { databaseError } from "../utils/errors";

class AppointmentInformation {
    public static table = "appointment_information";

    public static async getAllAppointments() {
        try {
            const appointments = await db(AppointmentInformation.table).select(
                APPOINTMENT_DATA_TO_SEND
            );

            return appointments;
        } catch (error) {
            throw databaseError;
        }
    }

    public static async createAppointment(appointment: AppointmentToInsert) {
        try {
            const newappointment = await db(
                AppointmentInformation.table
            ).insert({ ...appointment, appointmentStatus: "Booked" }, ["id"]);

            return newappointment;
        } catch (error) {
            throw databaseError;
        }
    }

    public static async getAllAppointmentsByUser(
        userId: number
    ): Promise<Appointment[]> {
        try {
            const appointment = await db(AppointmentInformation.table)
                .where({ patientId: userId })
                .select(APPOINTMENT_DATA_TO_SEND);

            return appointment;
        } catch (error) {
            throw databaseError;
        }
    }

    public static async getAppointment(
        appointmentId: number
    ): Promise<Appointment> {
        try {
            const appointment = await db(AppointmentInformation.table)
                .where({ id: appointmentId })
                .select(APPOINTMENT_DATA_TO_SEND)
                .first();

            return appointment;
        } catch (error) {
            throw databaseError;
        }
    }

    public static async updateAppointment(
        appointment: Appointment
    ): Promise<Appointment> {
        try {
            const [updatedappointment] = await db(AppointmentInformation.table)
                .where({ id: appointment.id })
                .update(appointment)
                .returning(APPOINTMENT_DATA_TO_SEND);

            return updatedappointment;
        } catch (error) {
            throw databaseError;
        }
    }

    public static async deleteAppointment(
        appointmentId: number
    ): Promise<void> {
        try {
            await db(AppointmentInformation.table)
                .where({ id: appointmentId })
                .delete();
        } catch (error) {
            throw databaseError;
        }
    }
}

export default AppointmentInformation;
