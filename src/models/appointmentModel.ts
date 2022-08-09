import { APPOINTMENT_DATA_TO_SEND } from "../constants/tableConstants";
import db from "../db/db";
import Appointment, { AppointmentToInsert } from "../domain/Appointment";

class AppointmentInformation {
    public static table = "appointment_information";

    public static async getAllAppointments() {
        const appointments = await db(AppointmentInformation.table).select(
            APPOINTMENT_DATA_TO_SEND
        );

        return appointments;
    }

    public static async createAppointment(appointment: AppointmentToInsert) {
        const newappointment = await db(AppointmentInformation.table).insert(
            { ...appointment, appointmentStatus: "Booked" },
            ["id"]
        );

        return newappointment;
    }

    public static async getAppointment(
        appointmentId: number
    ): Promise<Appointment> {
        const appointment = await db(AppointmentInformation.table)
            .where({ id: appointmentId })
            .select(APPOINTMENT_DATA_TO_SEND)
            .first();

        return appointment;
    }

    public static async updateAppointment(
        appointment: Appointment
    ): Promise<Appointment> {
        const [updatedappointment] = await db(AppointmentInformation.table)
            .where({ id: appointment.id })
            .update(appointment)
            .returning(APPOINTMENT_DATA_TO_SEND);

        return updatedappointment;
    }

    public static async deleteAppointment(
        appointmentId: number
    ): Promise<void> {
        await db(AppointmentInformation.table)
            .where({ id: appointmentId })
            .delete();
    }
}

export default AppointmentInformation;
