import multer from 'multer';
import fs from 'fs';
import path from 'path';


export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const { id } = req.query;  
        const dirPath = path.join(process.cwd(), 'public', 'uploads', 'rent', id, 'images');
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        cb(null, dirPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});


const uploadMiddleware = multer({ storage: storage }).single('image');

export default function handler(req, res) {
    if (req.method === 'POST') {
        uploadMiddleware(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                console.error('Multer error:', err);
                return res.status(500).json({ error: 'Multer error', message: err.message });
            } else if (err) {
                console.error('Unexpected error:', err);
                return res.status(500).json({ error: 'Unexpected error', message: err.message });
            }
            console.log('Received file:', req.file);

            res.status(200).json({ message: 'Image uploaded successfully!', file: req.file });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
