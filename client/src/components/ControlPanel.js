import React, {useState} from 'react';

export default function ControlPanel() {
  const [interval, setInterval] = useState("weekly");

  function intervalChange(event){
    setInterval(event.target.value);
  }

  return (
    <div id="controlPanel">
        <div>
          <table>
            <tbody>
              <tr>
                <td>
                  <span>Username</span>
                </td>
                <td>
                  <input type="text"></input>
                </td>
              </tr>
              <tr>
                <td>
                  Interval
                </td>
                <td id="interval">
                  <div>
                    <input type="radio" id="daily" name="interval" value="daily" checked={interval === "daily"} onChange={intervalChange}/>
                    <label htmlFor="daily">Täglich</label>  
                  </div>
                  <div>
                    <input type="radio" id="weekly" name="interval" value="weekly"  checked={interval === "weekly"} onChange={intervalChange}/>
                    <label htmlFor="weekly">Wöchentlich</label>
                  </div>
                  <div>
                    <input type="radio" id="monthly" name="interval" value="monthly"  checked={interval === "monthly"} onChange={intervalChange}/>
                    <label htmlFor="monthly">Monatlich</label>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <span>
                    Benachrichtigungen
                  </span>
                </td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <button>Hinzufügen</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="activeScraper">
          <h2>
            Aktive Scraper:
          </h2>
        </div>
    </div>
  )
}
