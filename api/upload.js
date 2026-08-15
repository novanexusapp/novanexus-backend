import formidable from "formidable";
import fs from "fs";
import { Storage } from "megajs";

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).send("Upload error");

    const file = files.file;
    const data = fs.readFileSync(file.filepath);

    // MEGA bağlantısı
    const storage = await new Storage({
      email: "MEGA_MAIL",
      password: "MEGA_PASS"
    }).ready;

    const uploaded = await storage.upload(file.originalFilename, data);

    res.json({ fileUrl: uploaded.link });
  });
}
