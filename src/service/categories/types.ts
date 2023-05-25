export type Category = {
  id?: number;
  href?: string;
  src?: string;
  title?: string;
  slug?: string;
};

export type CategoryCreate = {
  href: Category["href"];
  src: Category["src"];
  title: Category["title"];
};

export type CategoryUpdate = Category;

export type CategoryResponse = Category;

export type CategoryId = {
  id: Category["id"];
};
