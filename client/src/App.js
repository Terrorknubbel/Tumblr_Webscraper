import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import NotFound from './NotFound';
import { useAuth0 } from '@auth0/auth0-react';
import Tumblr from './views/Tumblr';


export default function App() {
    const {
        isLoading,
        isAuthenticated,
        loginWithRedirect,
        getAccessTokenSilently    
    } = useAuth0();
    const [data, setData] = useState();

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
                <Route path="tumblr" element={<Tumblr />} />
                <Route 
                    path="*"
                    element={<NotFound />}
                />
            </Route>
        </Routes>
        </>
    )    
}
