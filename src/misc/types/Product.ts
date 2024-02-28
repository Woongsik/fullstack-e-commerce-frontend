import Category from "./Category";

export type ProductBase = {
  title: string;
  price: number;
  description: string;
  images: string[];
}

export type Product = ProductBase & {
  id: string;
  creationAt: string;
  updatedAt: string;
  category: Category
}

export type ProductRegister = ProductBase & {
  categoryId: number;
}

export type ProductUpdate = {
  id: string;
  title?: string;
  price?: number;
  description?: string;
  images?: string[];
  cateogryId?: number;
}