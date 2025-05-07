
export interface Gift {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  storeUrl: string;
  isReserved: boolean;
  reservedBy: string;
}
