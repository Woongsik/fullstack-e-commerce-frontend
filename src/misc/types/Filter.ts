import { SortCreated, SortPrice, SortTitle } from "./Sort";

export type Filter = {
  title: string;
  categoryId: number;
  min_price: number;
  max_price: number;
  page: number;
  itemsPerPage: number;
  sort_created: SortCreated;
  sort_price: SortPrice;
  sort_title: SortTitle;
}