import { pipeline, PipelineType } from "@xenova/transformers";

class modelPipeline {
  static task: PipelineType = "image-classification";
  static model = "Xenova/vit-base-patch16-224";
  static instance: any = null;

  static async getInstance(progress_callback: Function | any = null) {
    if (this.instance === null) {
      this.instance = await pipeline(this.task, this.model, {
        progress_callback,
      });
    }

    return this.instance;
  }
}
