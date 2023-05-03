import { AppDataSource } from "../../data-source";
import { Image as ImageTable } from "../../entities/Image";
import { ImageId } from "./types";

export class DeleteImageService {
  async execute({ id }: ImageId) {
    const imageRepo = AppDataSource.getRepository(ImageTable);
    const imageId = await imageRepo.findOne({ where: { id } });

    if (!imageId) {
      throw new DoesNotExistError("Image does not exist");
    }

    return await imageRepo.delete({
      id,
    });
  }
}
