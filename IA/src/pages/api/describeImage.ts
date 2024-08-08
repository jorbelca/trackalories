import { MyClassificationPipeline } from "@/pipe";
import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";

// Desactivar el manejo de archivos de Next.js por defecto
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = new IncomingForm({
      uploadDir: path.join(process.cwd(), "public", "uploads"),
      keepExtensions: true,
    });

    form.parse(req, async (err, fields: Record<string, any>, files) => {
      if (err) {
        console.error("Error al procesar el archivo:", err);
        return res.status(500).json({ error: "Error al procesar el archivo" });
      }

      const imageFile = files.image?.[0]?.filepath as string;

      if (!imageFile) {
        return res.status(400).json({ error: "No image provided" });
      }

      try {
        const result = await processImage(imageFile);
        fs.unlinkSync(imageFile); // Elimina el archivo temporal después de procesar
        res.status(200).json({ data: result });
      } catch (error) {
        res.status(500).json({ error: (error as Error).message });
      }
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

const processImage = async (filePath: string) => {
  try {
    const classifier = await MyClassificationPipeline.getInstance();
    const result = await classifier(filePath, {
      topk: 5,
    });
    return result;
  } catch (error) {
    console.error("Error classifying image:", error);
    throw new Error("Error classifying image");
  }
};
