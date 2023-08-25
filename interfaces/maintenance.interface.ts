export enum StatusOption {
  inProcess = 'En proceso',
  completed = 'Completado',
  confirmed = 'Confirmado'
}

export interface MaintenanceAttributes {
    id: number;
    activities: string;
    voltage_on_L1L2: number;
    voltage_on_L1L3: number;
    voltage_on_L2L3: number;
    voltage_control : number;
    suction_pressure: number;
    discharge_pressure : number;
    amp_engine_1 : number;
    amp_engine_2 : number;
    amp_engine_3 : number;
    amp_engine_4 : number;
    amp_engine_evap : number;
    compressor_1_amp_L1: number;
    compressor_1_amp_L2: number;
    compressor_1_amp_L3: number;
    compressor_2_amp_L1: number;
    compressor_2_amp_L2: number;
    compressor_2_amp_L3: number;
    supply_temp: number;
    return_temp : number;
    water_in_temp : number;
    water_out_temp : number;
    sprinkler_state: string;
    float_state: string;
    service_hour : string;
    service_date: string;
    customer_sign : string;
    tech_sign: string;
    photos: any;
    tech: {
      techId: string;
      techName: string;
      techNumId: string;
    };
    customerId : string;
    observations: string;
    additional_remarks:string;
    status: StatusOption;
    delete: boolean;
  }