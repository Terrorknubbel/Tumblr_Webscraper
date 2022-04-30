import React from 'react';
import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="notFound">
        <h1>404</h1>
        <h3>Diese Seite konnte nicht gefunden werden.</h3>
        <span>Gehe bitte zurück zur <NavLink  to="/">Startseite</NavLink></span>
    </div>
  )
}
