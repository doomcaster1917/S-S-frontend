import React, {useState} from 'react'
import {BrowserRouter, Route, Routes, Link, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import Game from "./pages/Game/Game";
import Home from "./pages/home/home"
import "./styles/App.css"
import Navbar from "./components/Navbar/Navbar";

function App() {
    return(
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/account" element={<Account/>}/>
                <Route path="/game" element={<Game/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route
                    path="*"
                    element={<Navigate to="/home" replace />}/>
            </Routes>

        </BrowserRouter>
    )
}

export default App;
