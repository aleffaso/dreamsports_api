export type Image = {
  id?: number;
  title?: string;
  src?: string;
  main?: boolean;
};

export type ImageCreate = {
  id?: Image["id"];
  title?: Image["title"];
  src?: Image["src"];
  main?: Image["main"];
};

export type ImageUpdate = Image;

export type ImageResponse = Image;

export type ImageId = {
  id: Image["id"];
};
