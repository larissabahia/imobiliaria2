import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'GET') {
   
    const directoryPath = path.join(process.cwd(), 'public', 'uploads', 'rent');
    const directories = fs.readdirSync(directoryPath);

    const properties = directories.map(dir => {
      const jsonDataPath = path.join(directoryPath, dir, `${dir}.json`);
      if (!fs.existsSync(jsonDataPath)) {
        console.log(`JSON data not found for directory: ${dir}`);
        return null; 
      }
      const jsonData = JSON.parse(fs.readFileSync(jsonDataPath, 'utf8'));

      return {
        id: dir,
        name: jsonData.name,
        location: jsonData.logradouro,
        imgUrl: `/uploads/rent/${dir}/${jsonData.name}Image${path.extname(jsonData.imageUrl)}`, 
        googleMapsUrl: `https://www.google.com/maps/place/${encodeURIComponent(jsonData.logradouro)},+${encodeURIComponent(jsonData.cidade)},+${encodeURIComponent(jsonData.estado)}`
      };
    }).filter(Boolean); 

    res.status(200).json(properties);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
