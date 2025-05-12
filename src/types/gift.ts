
export interface Gift {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string; 
  image_url: string;
  store_url: string;
  isReserved: boolean;
  reservedBy: string;
}
