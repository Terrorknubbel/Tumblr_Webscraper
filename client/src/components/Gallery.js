import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Gallery({ accessToken }) {

    const [images, setImages] = useState([]);
    const api_server = process.env.REACT_APP_API_SERVER;
    
    const getImages = async () => {       
        try {
            let response = await axios.get(`${api_server}/tumblr/images`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
            
            
            let newImages = [];
            response.data.forEach((data, index) => {
                newImages.push(
                    <div className="image" key={index}>
                        <img src={api_server + data.image}/>
                        <div>
                            <span>{data.owner}</span>
                            <span>{data.date}</span>
                        </div>
                    </div>
                );
            })

            setImages(newImages);
            
        } catch (e) {
            console.log(e.message);
        }
    };

    useEffect(() => {     
        getImages();
    }, [accessToken]);

    return (
        <div id="gallery">
            {images}
        </div>
    )
}
