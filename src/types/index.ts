export interface User {
  id: number;
  fullName: string;
  email: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Material {
  id: number;
  name: string;
}

export interface PowerSupply {
  id: number;
  name: string;
  price: number;
}

export interface Accessory {
  id: number;
  name: string;
  price: number;
}

export interface QuotationData {
  id: number;
  category_id: number;
  material: Material;
  power_supply: PowerSupply;
  accessories: Accessory[];
  total_price: number;
  created_at: string;
}
