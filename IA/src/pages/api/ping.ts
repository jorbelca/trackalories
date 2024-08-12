import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json({ response: "pong" });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
