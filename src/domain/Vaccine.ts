interface Vaccine {
    id: number;
    serviceName: string;
    siteLocation: string;
    startDate: string;
    endDate: string;
    numberOfDoses: number;
    gender: string;
    age: number;
    ethinicity: string;
}

export type VaccineToInsert = Omit<Vaccine, "id">;

export default Vaccine;
