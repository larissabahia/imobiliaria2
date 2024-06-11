import CreateImgRent from '@/components/CreateImgRent';
import Header from '@/components/Header';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

export default function EditRent() {

    const router = useRouter();
    const { id } = router.query;
    const [property, setProperty] = useState(null);
    const [image, setImage] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);



    useEffect(() => {
        if (id) {
            console.log("caiu aki")
            fetch(`/api/editrent/${encodeURIComponent(id)}`)
                .then(res => res.json())
                .then(data => {
                    console.log("API data:", data);
                    setProperty(data);
                })
                .catch(error => console.error('Failed to load property details:', error));
        }
    }, [id]);

    //create imgs
    const handleUpload = async (e) => {

        e.preventDefault();
        const formattedName = formatName(name);
        const formData = new FormData();

        formData.append('image', image);

        const response = await fetch(`/api/createimgrent/${encodeURIComponent(id)}`, {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        console.log(result);
    };

    function formatName(name) {
        return name.replace(/-/g, ' ');
    }



    useEffect(() => {
        console.log("properrty", property)
        console.log("name", id)
    }, [property, id])

    return (
        <>
            <Head>
                <title>Editar imṍvel</title>
                <meta name="description" content="Administrar propriedades" />
            </Head>

            <Header />

            <h1 style={{ marginBottom: "3rem" }}>Editar imóvel</h1>

            <div className="container">
                <h1>Detalhes do imóvel</h1>

                {property ? (
                    <>
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

                                <tr>
                                    <td>{formatName(property.name)}</td>
                                    <td><a href={property.googleMapsUrl} target="_blank">{property.logradouro}</a></td>
                                    <td><img src={property.imageUrl} alt={`Imagem de ${property.name}`} style={{ width: '100px' }} /></td>
                                    <td>
                                        <button className="buttonAdmin" >
                                            Editar
                                        </button>
                                    </td>
                                </tr>

                            </tbody>
                        </table>



                    </>
                ) : <p>Carregando...</p>}

            </div>

            <div className="container">
                <h1>Imagens do imóvel</h1>

                <div className="createSection" style={{ marginTop: "3rem" }}>
                    <button onClick={() => setModalVisible(true)}
                        className="buttonAdmin"
                        style={{ padding: "1rem", fontSize: "1rem" }}>
                        Adicionar nova imagem</button>
                </div>

                <CreateImgRent isVisible={isModalVisible} onClose={() => setModalVisible(false)} id={id} />

                <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th> Imagem </th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>

                                <td><img alt={`Imagem de `} style={{ width: '100px' }} /></td>
                                <td>
                                    <button className="buttonAdminDelete" >
                                        Excluir
                                    </button>
                                </td>
                            </tr>

                        </tbody>
                    </table>



                    <form onSubmit={handleUpload}>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
                        <button type="submit">Upload Image</button>
                    </form>

                </>


            </div>
        </>
    );
}
