import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);
const unlink = promisify(fs.unlink);
const rmdir = promisify(fs.rmdir);

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { name } = req.query; 

   
    const dirPath = path.join(process.cwd(), 'public', 'uploads', 'rent', name);

    try {

      if (fs.existsSync(dirPath)) {
      
        const files = await readdir(dirPath);
      
        await Promise.all(files.map(file => unlink(path.join(dirPath, file))));

        await rmdir(dirPath);

        res.status(200).json({ message: 'Property deleted successfully' });
      } else {
        res.status(404).json({ message: 'Property not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete property', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
