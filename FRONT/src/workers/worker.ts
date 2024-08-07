import { pipeline, PipelineType } from "@xenova/transformers";

class ModelPipeline {
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

// Listen for messages from the main thread
self.addEventListener("message", async (event: MessageEvent) => {
  // Retrieve the image classification pipeline. When called for the first time,
  // this will load the pipeline and save it for future use.
  let classifier = await ModelPipeline.getInstance((x: any) => {
    // We also add a progress callback to the pipeline so that we can
    // track model loading.
    self.postMessage(x);
  });

  // Actually perform the image classification
  let output = await classifier(event.data.img, {
    // Allows for partial output
    callback_function: (x: any) => {
      self.postMessage({
        status: "update",
        output: x,
      });
    },
  });

  // Send the output back to the main thread
  self.postMessage({
    status: "complete",
    output: output,
  });
});
