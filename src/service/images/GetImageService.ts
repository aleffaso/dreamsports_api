import { AppDataSource } from "../../data-source";

import { Image as ImageTable } from "../../entities/Image";
import { ImageId, ImageResponse } from "./types";

export class GetImageService {
  async execute({ id }: ImageId) {
    const imageRepo = AppDataSource.getRepository(ImageTable);

    const image = await imageRepo.findOne({ where: { id } });

    if (!image) {
      throw new DoesNotExistError("Image does not exist");
    }

    const imageResponse: ImageResponse = {
      id: image.id,
      src: image.src,
      title: image.title,
      main: image.main,
    };

    return { image: imageResponse };
  }
}
