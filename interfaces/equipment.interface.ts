/* export interface EquipmentAttributes {
  id: string;
  name: string;
  description: string;
  serial: string;
  image: string;
  model: string;
  type: string;
  brand: string;
  location:{
    locationId: string;
    locationName : string;
  };
  headquarter: {
    headId: string;
    headName: string;
  };
  client: {
    clientId: string;
    clientName: string;
  };
  status: boolean;

} */

export interface EquipmentAttributes {
  id: string;
  name: string;
  description: string;
  serial: string;
  image: string;
  model: string;
  type: string;
  brand: string;
  status: boolean;
}