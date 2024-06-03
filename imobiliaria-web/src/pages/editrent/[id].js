import Header from '@/components/Header';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';

export default function EditRent() {
   

   

    return (
        <>
            <Head>
                <title>Editar imṍvel</title>
                <meta name="description" content="Administrar propriedades" />
            </Head>

        <Header/>

            <h1 style={{ marginBottom : "3rem"}}>Editar imóvel</h1>

            <div className="container">
                <h1>Detalhes do imovel</h1>

             
           <form>
            nome 
           </form>
           <form>
            localização 
           </form>
            </div>
        </>
    );
}
