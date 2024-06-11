import { useState } from 'react';

const CreateImgRent = ({ isVisible, onClose , id }) => {

  const [image, setImage] = useState(null);
  

  const handleSubmit = async (e) => {

    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
 
    const response = await fetch(`/api/createimgrent/${encodeURIComponent(id)}`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    onClose();
  };

  
  if (!isVisible) return null;

  return (
    <div className="backdrop">
      <div className="modal">
        <button className="closeButton" onClick={onClose}>X</button>
        <form onSubmit={handleSubmit}>
          <label >
            <span className='labelModalCreate'>Foto:</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
          </label>
          <button type="submit" className="buttonAdmin" style={{padding : "0.5rem", marginTop : "1rem"}}>Criar Propriedade</button>
        </form>
      </div>
    </div>
  );
};

export default CreateImgRent;
