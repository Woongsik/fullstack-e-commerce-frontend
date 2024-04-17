import { Address } from "./Address";
import { CartItem } from "./CartItem";

export enum OrderStatus {
  Prepare = 'prepare',
  OnDelivery = 'delivering',
  Delivered = 'delivered'
}

export type OrderItem = CartItem & {
  product: string; // product id
}

export type OrderRegistesr = {
  items: OrderItem[];
  totalPrice: number;
  shippingAddress: Address;
  payment: boolean;
}

export type Order = OrderRegistesr & {
  status: OrderStatus;
}