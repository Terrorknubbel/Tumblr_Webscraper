import React from 'react';
import { Outlet, NavLink } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';


export default function Navbar() {
    const { isAuthenticated, logout } = useAuth0();

    if(isAuthenticated){
        return (
            <>
                <nav>
                    <div className="logo">Webscraper</div>
                    <div className="links">
                        <NavLink className={({ isActive }) => isActive ? "active" : ""} to="tumblr">Tumblr</NavLink>
                        <NavLink className={({ isActive }) => isActive ? "active" : ""} to="instagram">Instagram</NavLink>
                        <NavLink className={({ isActive }) => isActive ? "active" : ""} to="reddit">Reddit</NavLink>
                        <span>|</span>
                        <NavLink to="profil">Profil</NavLink>
                        <button onClick={() => logout()}>
                            Abmelden
                        </button>
                    </div>
                </nav>
                
                <Outlet />
            </>
        )
    }    
}
