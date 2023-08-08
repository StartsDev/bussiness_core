export interface MaintenanceAttributes {
    id: string;
    serviceOrder: string;
    activities: string;
    voltage_on_L1L2: number;
    voltage_on_L1L3: number;
    voltage_on_L2L3: number;
    suction_pressure: number;
    amp_engine_1 : number;
    amp_engine_2 : number;
    amp_engine_3 : number;
    discharge_pressure : number;
    service_hour : string;
    serive_date: Date;
    customer_sign : string;
    tech_sign: string;
    photos: string[];
    techId: string;
    observations: string;
    status: boolean;
  }