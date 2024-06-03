import multer from 'multer';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const { name } = req.body;
      const uploadDir = path.join(process.cwd(), 'src', 'uploads', 'rent', name);
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const { location } = req.body;
      cb(null, `${location}.jpg`);
    },
  }),
});

const uploadMiddleware = upload.single('image');

export default function handler(req, res) {
  if (req.method === 'POST') {
    uploadMiddleware(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ error: err.message });
      } else if (err) {
        return res.status(500).json({ error: err.message });
      }

      const { name, location } = req.body;
      const jsonData = {
        name,
        location,
        imageUrl: `/src/uploads/rent/${name}/${location}.jpg`
      };
      const uploadDir = path.join(process.cwd(), 'src', 'uploads', 'rent', name);
      fs.writeFileSync(path.join(uploadDir, `${location}.json`), JSON.stringify(jsonData));

      res.status(200).json({ message: 'File uploaded and JSON saved successfully in rent folder.' });
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
