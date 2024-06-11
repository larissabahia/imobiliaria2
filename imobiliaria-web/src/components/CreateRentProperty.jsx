import { useState } from 'react';

const CreateRentProperty = ({ isVisible, onClose }) => {

  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState({});

  const formatName = (name) => {
    return name.trim().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedName = formatName(name); 
    const formData = new FormData();
    formData.append('name', formattedName);
    formData.append('image', image);
    formData.append('cep', cep);
    formData.append('logradouro', address.logradouro || '');
    formData.append('bairro', address.bairro || '');
    formData.append('cidade', address.localidade || '');
    formData.append('estado', address.uf || '');

    const response = await fetch('/api/createrent', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    console.log(result);
    onClose();
  };

  const handleCepChange = async (event) => {
    const newCep = event.target.value;
    setCep(newCep);
    if (newCep.length === 8) {
      const response = await fetch(`https://viacep.com.br/ws/${newCep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setAddress(data);
      } else {
        setAddress({});
      }
    } else {
      setAddress({});
    }
  };

  if (!isVisible) return null;

  return (
    <div className="backdrop">
      <div className="modal">
        <button className="closeButton" onClick={onClose}>X</button>
        <form onSubmit={handleSubmit}>
          <label >
            Nome da Propriedade:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label >
            <span className='labelModalCreate'>Foto:</span>
         
            <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
          </label>
          <label >
          <span className='labelModalCreate'> CEP:</span>
            <input type="text" value={cep} onChange={handleCepChange} required/>
          </label>
          <label>
            Rua:
            <input type="text" value={address.logradouro || ''} readOnly />
          </label>
          <label>
            Bairro:
            <input type="text" value={address.bairro || ''} readOnly />
          </label>
          <label>
            Cidade:
            <input type="text" value={address.localidade || ''} readOnly />
          </label>
          <label>
            Estado:
            <input type="text" value={address.uf || ''} readOnly />
          </label>
          <button type="submit" className="buttonAdmin" style={{padding : "0.5rem", marginTop : "1rem"}}>Criar Propriedade</button>
        </form>
      </div>
    </div>
  );
};

export default CreateRentProperty;
