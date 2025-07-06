import { StorageOption } from "@/types/phone";

export interface CartItem {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  color: string;
  storage: StorageOption;
  basePrice: number;
  totalPrice: number;
  quantity: number;
}
