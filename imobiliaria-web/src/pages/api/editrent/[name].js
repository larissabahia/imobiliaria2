import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const { name } = req.query; // O nome da propriedade é obtido do parâmetro da URL
    const dirPath = path.join(process.cwd(), 'public', 'uploads', 'rent', name);

    // Verificar se o diretório existe
    if (fs.existsSync(dirPath)) {
        const data = fs.readFileSync(path.join(dirPath, `${name}.json`), 'utf8');
        const propertyData = JSON.parse(data);

        // Encontrar a extensão do arquivo de imagem dentro do diretório
        const imageFile = fs.readdirSync(dirPath).find(file => file.startsWith(`${name}Image`));
        
        if (!imageFile) {
            return res.status(404).json({ message: "Image file not found" });
        }

        const imageUrl = `/uploads/rent/${name}/${imageFile}`;

        // Adicionando a URL da imagem aos dados da propriedade
        const fullPropertyData = {
            ...propertyData,
            imageUrl
        };

        res.status(200).json(fullPropertyData);
    } else {
        res.status(404).json({ message: 'Property not found' });
    }
}
