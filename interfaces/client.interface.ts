export interface User {
  user_id: string;
  role_id: string;
  role_name :string;
}

export interface ClientAttributes {
  id: string;
  businessName: string;
  nit: string;
  address: string;
  email: string;
  phone: string;
  city: string;
  contact: string;
  status: boolean;
  user_app: User[];
}
