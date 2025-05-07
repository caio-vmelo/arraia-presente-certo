export interface Gift {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string; 
  imageUrl: string;
  storeUrl: string;
  isReserved: boolean;
  reservedBy: string;
}
