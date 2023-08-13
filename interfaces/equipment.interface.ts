export interface EquipmentAttributes {
  id: string;
  name: string;
  description: string;
  serial: string;
  image: {
    public_id: string;
    secure_url: string;
  };
  model: string;
  brand: string;
  status: boolean;
}
