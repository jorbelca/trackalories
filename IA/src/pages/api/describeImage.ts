import { MyClassificationPipeline } from "@/pipe";
import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";
import Cors from "cors";

// Inicializa el middleware CORS
const cors = Cors({
  origin: ["http://localhost:5173", "https://trackalories.vercel.app"],
  methods: ["GET", "HEAD", "POST"],
});

// Función para manejar el middleware CORS
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
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
  await runMiddleware(req, res, cors);
  if (req.method === "POST") {
    const uploadDir = path.join(process.cwd(), "tmp", "uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const form = new IncomingForm({
      uploadDir,
      keepExtensions: true,
    });

    form.parse(req, async (err, fields: Record<string, any>, files) => {
      if (err) {
        console.error("Error al procesar el archivo:", err);
        return res.status(500).json({ error: "Error al procesar el archivo" });
      }

      const imageFile = Array.isArray(files.image)
        ? files.image[0].filepath
        : null;

      if (!imageFile) {
        return res.status(400).json({ error: "No image provided" });
      }

      try {
        const result = await processImage(imageFile);
        fs.unlink(imageFile, (err) => {
          if (err) console.error("Error al eliminar el archivo temporal:", err);
        }); // Elimina el archivo temporal después de procesar
        res.status(200).json({ result });
      } catch (error) {
        console.error("Error classifying image:", error);
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
    let result = await classifier(filePath, {
      topk: 5,
    });
    let final: Array<any> = [];
    result.map((res: any, idx: number) => {
      if (res.score > 0.1) final.push(result[idx]);
    });
    return final;
  } catch (error) {
    console.error("Error classifying image:", error);
    throw new Error("Error classifying image");
  }
};
