export type CategoryBase = {
  title: string;
  image: string;
}

export type Category = CategoryBase & {
  _id: string;
}