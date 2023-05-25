export type Brand = {
  id?: number;
  title?: string;
};

export type BrandCreate = {
  id?: Brand["id"];
  title?: Brand["title"];
};

export type BrandUpdate = Brand;

export type BrandResponse = Brand;

export type BrandId = {
  id: Brand["id"];
};
