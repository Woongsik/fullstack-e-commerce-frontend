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

export type Order = {
  items: OrderItem[],
  shippingAddress: Address;
  payment: boolean;
  status: OrderStatus;
}