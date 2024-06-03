import CreateProperty from '@/components/CreateProperty';
import Head from 'next/head';
import React, { useState , useEffect} from 'react';

export default function Admin() {

  const properties = [
    { id: 1, name: "Casa Azul", location: "São Paulo, SP", imgUrl: "/path/to/image1.jpg" },
    { id: 2, name: "Apartamento Verde", location: "Rio de Janeiro, RJ", imgUrl: "/path/to/image2.jpg" },
    // Adicione mais propriedades conforme necessário
  ];

  const [isModalVisible, setModalVisible] = useState(false);


  return (



    <div className="container">
      <Head>
        <title>Administrar Casas/Apartamentos</title>
        <meta name="description" content="Administrar propriedades" />
      </Head>


      <h1>Administrar Casas/Apartamentos</h1>

      <div className="createSection">
        <span>Criar nova casa</span>
        <button onClick={() => setModalVisible(true)} className="button">Criar nova casa</button>
      </div>

      <CreateProperty isVisible={isModalVisible} onClose={() => setModalVisible(false)} />

      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Localização</th>
            <th>Imagem</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {properties.map(property => (
            <tr key={property.id}>
              <td>{property.name}</td>
              <td>{property.location}</td>
              <td><img src={property.imgUrl} alt={`Imagem de ${property.name}`} style={{ width: '100px' }} /></td>
              <td>
                <button className="button">Editar</button>
                <button className="button" style={{ marginLeft: '10px' }}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
