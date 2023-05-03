export type Size = {
  id?: number;
  title?: string;
};

export type SizeCreate = {
  id?: Size["id"];
  title?: Size["title"];
};

export type SizeUpdate = Size;

export type SizeResponse = Size;

export type SizeId = {
  id: Size["id"];
};
