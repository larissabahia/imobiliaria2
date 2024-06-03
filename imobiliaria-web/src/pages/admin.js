import CreateRentProperty from '@/components/CreateProperty';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';

export default function Admin() {

    const properties = [
        { id: 1, name: "Casa Azul", location: "São Paulo, SP", imgUrl: "/path/to/image1.jpg" },
        { id: 2, name: "Apartamento Verde", location: "Rio de Janeiro, RJ", imgUrl: "/path/to/image2.jpg" },
    ];

    const [isModalVisible, setModalVisible] = useState(false);


    return (
        <>
            <Head>
                <title>Administração de venda e aluguéis de propriedades</title>
                <meta name="description" content="Administrar propriedades" />
            </Head>

            <h1>Administração de venda e aluguéis de propriedades</h1>

            <div className="container">
                <h1>Propriedades para alugar</h1>

                <div className="createSection" style={{ marginTop : "3rem"}}>
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
                                    <button className="buttonAdmin">Editar</button>
                                    <button className="buttonAdmin" style={{ marginLeft: '10px' }}>Deletar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <a href="https://www.google.com/maps/place/Liberdade,+São+Paulo,+SP" target="_blank">Ver Liberdade no Google Maps</a>

        </>
    );
}
