import React from 'react';
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar_links">
                <ul>
                <li><Link to="/about">О сайте</Link></li>

                <li><Link to="/counter">Щёлкалка</Link></li>

                <li><Link to="/register">Регистрация</Link></li>

                <li><Link to="/game">Игра</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;