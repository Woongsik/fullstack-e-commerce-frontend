import { Address } from "./Address";
import { CartItem } from "./CartItem";
import { Product } from "./Product";
import { User } from "./User";

export enum OrderStatus {
  Prepare = 'prepare',
  OnDelivery = 'delivering',
  Delivered = 'delivered'
}

export type OrderRegistesrItem = Omit<CartItem, 'item'> & {
  product: string; // product id
}

export type OrderRegistesr = {
  items: OrderRegistesrItem[];
  totalPrice: number;
  shippingAddress: Address;
  payment: boolean;
}

export type OrderItem = Omit<CartItem, 'item'> & {
  product: Product;
}

export type Order = OrderRegistesr & {
  _id: string;
  user: User;
  items: OrderItem[];
  createdAt: Date;
  status: OrderStatus;
  product: Product;
}