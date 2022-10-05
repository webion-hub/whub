export interface UploadImageRequest {
  readonly image: string | Blob;
  readonly index: number;
}