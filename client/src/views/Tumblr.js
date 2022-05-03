import React, { useEffect, useState } from 'react'
import ControlPanel from '../components/ControlPanel';
import Gallery from '../components/Gallery';
import { useAuth0 } from '@auth0/auth0-react';

export default function Tumblr () {
    const { getAccessTokenSilently } = useAuth0();
    const [accessToken, setAccessToken] = useState();

    async function getToken(){
        try {
            const token = await getAccessTokenSilently({
                audience: `https://www.terrorknubbel.de`
            });
            setAccessToken(token);
        } catch (e) {
            console.log(e.message);
        }
    }

    useEffect(() => {
        getToken();
    }, [getAccessTokenSilently])

    if(accessToken){
        return (
            <div id="main">
                <h1>Tumblr Scraper</h1>
                <ControlPanel accessToken={accessToken}/>
                <Gallery accessToken={accessToken} />      
            </div>
        )
    }
}
