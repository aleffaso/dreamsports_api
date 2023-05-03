import { AppDataSource } from "../../data-source";
import { instanceToPlain } from "class-transformer";

import { Image as ImageTable } from "../../entities/Image";

export class ListImagesService {
  async execute() {
    const imageRepo = AppDataSource.getRepository(ImageTable);

    const images = await imageRepo.find();

    return instanceToPlain(images);
  }
}
