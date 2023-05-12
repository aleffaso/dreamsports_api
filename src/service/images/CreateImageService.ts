import { AppDataSource } from "../../data-source";
import { Image as ImageTable } from "../../entities/Image";
import { AlreadyExistsError } from "../../errors";
import { Image, ImageCreate } from "./types";

export class CreateImageService {
  async execute({ id, src, title, main }: ImageCreate) {
    const imageRepo = AppDataSource.getRepository(ImageTable);
    const imageAlreadyExists = await imageRepo.findOne({
      where: { id },
    });

    if (imageAlreadyExists) {
      throw new AlreadyExistsError("Image already exists");
    }

    const image = imageRepo.create({
      src,
      title,
      main,
    });

    await imageRepo.save(image);

    const imageResponse: Image = {
      id: image.id,
      src: src,
      title: title,
      main: main,
    };

    return { image: imageResponse };
  }
}
