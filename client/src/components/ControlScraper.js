import React, { useState } from 'react';
import Scraper from './Scraper';

export default function ControlScraper({ scraperList }) {
  
  return (
      <div id="activeScraper">
        <h2>
          Aktive Scraper
        </h2>
        <div className='scraper-wrapper'>
          {scraperList.map((data, index) => {
            return <Scraper key={index} username={data.username} />
          })}
        </div>
      </div>
  )
}
