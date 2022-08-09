interface Appointment {
    id: number;
    patientId: number;
    siteLocation: string;
    serviceType: string;
    appointmentStatus: string;
}

export type AppointmentToInsert = Omit<Appointment, "id">;

export default Appointment;