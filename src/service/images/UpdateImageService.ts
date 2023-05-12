import slugify from "slugify";
import { AppDataSource } from "../../data-source";
import { Image as ImageTable } from "../../entities/Image";
import { ImageUpdate, ImageResponse } from "./types";
import { AlreadyExistsError, DoesNotExistError } from "../../errors";

export class UpdateImageService {
  async execute({ id, src, title, main }: ImageUpdate) {
    const imageRepo = AppDataSource.getRepository(ImageTable);
    const image = await imageRepo.findOne({ where: { id } });

    if (!image) {
      throw new DoesNotExistError("Image does not exist");
    }

    if (title === image.title) {
      throw new AlreadyExistsError("Already exists");
    }

    await imageRepo.update(id as number, {
      src: src,
      title: title,
      main: main,
    });

    const ImageResponse: ImageResponse = {
      id: id,
      src,
      title,
      main,
    };

    return { Image: ImageResponse };
  }
}
