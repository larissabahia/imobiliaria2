import { useState } from 'react';


const CreateProperty = ({ isVisible, onClose }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, location, image });
    onClose();
  };

  
  
  if (!isVisible) return null;

  return (
    <div className="backdrop">
      <div className="modal">
        <button className="closeButton" onClick={onClose}>X</button>
        <form onSubmit={handleSubmit}>
          <label>
            Casa:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Localização:
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </label>
          <label>
            Foto:
            <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
          </label>
          <button type="submit" className="button">Criar Casa</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProperty;
