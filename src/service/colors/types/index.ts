export type Color = {
  id?: number;
  title?: string;
};

export type ColorCreate = {
  id?: Color["id"];
  title?: Color["title"];
};

export type ColorUpdate = Color;

export type ColorResponse = Color;

export type ColorId = {
  id: Color["id"];
};
