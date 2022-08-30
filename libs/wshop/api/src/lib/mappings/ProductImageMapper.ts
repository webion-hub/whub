import { ResponseMapper } from "@whub/apis-core";
import { Image } from "../model/Image";

export class ProductImageMapper extends ResponseMapper<Image> {
  map(image: Image): Image {
    return {
      ...image,
      url: this.mapUrl(image.url),
    };
  }
}