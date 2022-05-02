import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Scraper() {
    return (
        <div className='scraper'>
            <div className='name'>
                Brotmitritalin
            </div>
            <div className='controls'>
                <FontAwesomeIcon icon={faPause} />
                <FontAwesomeIcon className='trash' icon={faTrash} />
            </div>
        </div>
    )
}
