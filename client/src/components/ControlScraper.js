import React from 'react';
import Scraper from './Scraper';

export default function ControlScraper() {
    return (
        <div id="activeScraper">
          <h2>
            Aktive Scraper
          </h2>
          <div className='scraper-wrapper'>
              <Scraper />
              <Scraper />
              <Scraper />
          </div>
        </div>
    )
}
