import CreateRentProperty from '@/components/CreateProperty';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';

export default function Admin() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [rentProperties, setRentProperties] = useState([]);
    const [updatedStatus, setUpdatedStatus] = useState(0);

    //Read rent
    useEffect(() => {
        const fetchProperties = async () => {
            const res = await fetch('/api/readrent');
            const data = await res.json();
            setRentProperties(data);
        };

        fetchProperties();
    }, [isModalVisible,updatedStatus]);

    //Delete rent
    function deleteProperty(name) {
        fetch(`/api/deleterent?name=${encodeURIComponent(name)}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                //console.log(data.message);
                setUpdatedStatus(prevStatus => prevStatus + 1);
            })
            .catch(error => console.error('Error deleting property:', error));
    }

    function formatName(name) {
        return name.replace(/-/g, ' ');
      }
      


    useEffect(() => {
        console.log(rentProperties)
    })

    return (
        <>
            <Head>
                <title>Administração de venda e aluguéis de propriedades</title>
                <meta name="description" content="Administrar propriedades" />
            </Head>

            <h1>Administração de venda e aluguéis de propriedades</h1>

            <div className="container">
                <h1>Propriedades para alugar</h1>

                <div className="createSection" style={{ marginTop: "3rem" }}>
                    <button onClick={() => setModalVisible(true)}
                        className="buttonAdmin"
                        style={{ padding: "1rem", fontSize: "1rem" }}>
                        Adicionar nova propriedade</button>
                </div>

                <CreateRentProperty isVisible={isModalVisible} onClose={() => setModalVisible(false)} />

                <table className="table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Localização</th>
                            <th>Foto de capa</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rentProperties.map(property => (
                            <tr key={property.id}>
                                <td>{formatName(property.name)}</td>
                                <td><a href={property.googleMapsUrl} target="_blank">{property.location}</a></td>
                                <td><img src={property.imgUrl} alt={`Imagem de ${property.name}`} style={{ width: '100px' }} /></td>
                                <td>
                                    <button className="buttonAdmin">Editar</button>
                                    <button className="buttonAdmin"
                                        style={{ marginLeft: '10px' }}
                                        onClick={() => deleteProperty(property.name)}>
                                        Deletar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
