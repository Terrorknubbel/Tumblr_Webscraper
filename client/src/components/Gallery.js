import React from 'react'

function importAll(r) {
    return r.keys().map(r);
}

export default function Gallery() {
    const imagePaths = importAll(require.context('../../public/assets', false, /\.(png|jpe?g|svg)$/));

    const images = [];

    imagePaths.forEach((img) => {
        images.push(
            <div className="image">
                <img src={img}/>
                <div>
                    <span>Brotmitritalin</span>
                    <span>30.04.2021 14:55</span>
                </div>
            </div>
        )
    })    

    return (
        <div id="gallery">
            {images}
        </div>
    )
}
