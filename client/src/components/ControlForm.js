import React, {useState} from 'react';

export default function ControlForm() {

    const [username, setUsername] = useState("");
    const [interval, setInterval] = useState("weekly");
    const [notification, setNotification] = useState(false);

    function handleUsernameChange(event){
        setUsername(event.target.value);
    }
    
    function intervalChange(event){
       setInterval(event.target.value);
    }
    
    function handleNotificationChange(event){
       setNotification(event.target.checked);
    }
    
    function handleSubmit(e){
       e.preventDefault();
       console.log(username, interval, notification);
    }

    return (
        <div id="controlForm">
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <span>Username</span>
                            </td>
                            <td>
                                <input name="username" required value={username} onChange={handleUsernameChange} type="text"></input>
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
                            <td id="notificationTd">
                                <input name="notification" checked={notification} onChange={handleNotificationChange} type="checkbox" />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button type="submit">Hinzufügen</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}
