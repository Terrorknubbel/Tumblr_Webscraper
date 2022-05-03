import React, { useState, useEffect } from 'react';
import ControlForm from './ControlForm';
import ControlScraper from './ControlScraper';
import axios from 'axios';

export default function ControlPanel({ accessToken }) {

  const [scraperList, setScraperList] = useState([]);
  const api_server = process.env.REACT_APP_API_SERVER;
  
  async function pushScraper(data){
    try {
      let response = await axios.post(`${api_server}/tumblr/scraper`, data, {
          headers: {
              Authorization: `Bearer ${accessToken}`,
          }
      });

      setScraperList(response.data);

    } catch (e) {
        console.log(e);
    }
  }

  useEffect(() => {
    async function getScraper(){
      let response = await axios.get(`${api_server}/tumblr/scraper`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
      });
  
      setScraperList(response.data);
  
    }

    getScraper();
  }, [accessToken])

  return (
    <div id="controlPanel">
        <ControlForm accessToken={accessToken} pushScraper={ pushScraper } />
        <ControlScraper scraperList={scraperList} />
    </div>
  )
}
