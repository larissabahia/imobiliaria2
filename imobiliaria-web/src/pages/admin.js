import CreateRentProperty from '@/components/CreateRentProperty';
import Header from '@/components/Header';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';


export default function Admin() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [rentProperties, setRentProperties] = useState([]);
    const [updatedStatus, setUpdatedStatus] = useState(0);
    const router = useRouter();


    //Read rent
    useEffect(() => {
        const fetchProperties = async () => {
            const res = await fetch('/api/readrent');
            const data = await res.json();
            setRentProperties(data);
        };

        fetchProperties();
    }, [isModalVisible, updatedStatus]);

    //Delete rent
    function deleteProperty(name) {
        if (confirm(`Tem certeza que deseja deletar o imóvel ${formatName(name)}?`)) {
            fetch(`/api/deleterent?name=${encodeURIComponent(name)}`, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(data => {

                    setUpdatedStatus(prevStatus => prevStatus + 1);
                    alert("Imóvel deletada com sucesso!");
                })
                .catch(error => {
                    console.error('Error deleting property:', error);

                    alert("Erro ao deletar o imóvel.");
                });
        } else {
            console.log("Deleção cancelada pelo usuário.");
        }
    }


    function formatName(name) {
        return name.replace(/-/g, ' ');
    }

    const handleEditClick = (name) => {
        router.push(`/editrent/${encodeURIComponent(name)}`);
    };

    useEffect(() => {
        console.log(rentProperties)
    })

    return (
        <>
            <Head>
                <title>Administração de venda e aluguéis de imóveis</title>
                <meta name="description" content="Administrar propriedades" />
            </Head>

            <Header />

            <h1 style={{ marginBottom: "3rem" }}>Administração de venda e aluguéis de imóveis</h1>

            <div className="container">
                <h1>Imóveis para alugar</h1>

                <div className="createSection" style={{ marginTop: "3rem" }}>
                    <button onClick={() => setModalVisible(true)}
                        className="buttonAdmin"
                        style={{ padding: "1rem", fontSize: "1rem" }}>
                        Adicionar novo imóvel</button>
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
                                    <button className="buttonAdmin" onClick={() => handleEditClick(property.name)}>
                                        Editar
                                    </button>
                                    <button className="buttonAdminDelete"
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
