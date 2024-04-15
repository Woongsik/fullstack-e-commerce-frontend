import { Size } from "./Size";
import { SortCreated, SortPrice, SortTitle } from "./Sort";

export type Filter = {
  title: string;
  categoryId: string;
  min_price: number;
  max_price: number;
  page: number;
  itemsPerPage: number;
  size: Size;
  sort_created: SortCreated;
  sort_price: SortPrice;
  sort_title: SortTitle;
}