import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import NotFound from './NotFound';
import { useAuth0 } from '@auth0/auth0-react';


export default function App() {
    const navigate = useNavigate();
    const {
        isLoading,
        isAuthenticated,
        loginWithRedirect,
        getAccessTokenSilently,
        getIdTokenClaims    
    } = useAuth0();
    const [data, setData] = useState();

    useEffect(() => {
        const getUserMetadata = async () => {
        const domain = process.env.REACT_APP_AUTH0_DOMAIN;
      
        try {
            const accessToken = await getAccessTokenSilently({
                audience: `https://www.terrorknubbel.de`
            });

            const idToken = await getIdTokenClaims();

            console.log(idToken);
            console.log(accessToken);
            const userDetailsByIdUrl = `http://localhost:3001/api/private`;
        
            const metadataResponse = await fetch(userDetailsByIdUrl, {
                headers: {
                Authorization: `Bearer ${accessToken}`,
                },
            });
        
            const { message } = await metadataResponse.json();
        
            setData(message);
        } catch (e) {
            console.log(e.message);
        }
    };
      
        getUserMetadata();
      }, [getAccessTokenSilently]);

    if (isLoading) return <div>Loading</div>
    if (!isAuthenticated) loginWithRedirect();
    //if (!data) return <div>Loading</div>

    return (
        <>
        <Routes>
            <Route path="/" element={ <Navbar />}>
                <Route 
                    index
                    element={
                        <main>
                        <p>Homepage</p>
                        {data}
                        </main>
                    }
                />
                <Route path="tumblr" element={<div>Tumblr</div>} />
                <Route 
                    path="*"
                    element={<NotFound />}
                />
            </Route>
        </Routes>
        </>
    )    
}
