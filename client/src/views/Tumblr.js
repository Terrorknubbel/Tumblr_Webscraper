import React from 'react'
import ControlPanel from '../components/ControlPanel';
import Gallery from '../components/Gallery';

export default function () {

    return (
        <div id="main">
            <h1>Tumblr Scraper</h1>

            <ControlPanel/>

            <Gallery />
        </div>
    )
}
