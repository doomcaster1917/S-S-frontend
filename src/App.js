import React, {useState} from 'react'
import Counter from "./components/Counter";
import {BrowserRouter, Route, Routes, Link, Navigate} from "react-router-dom";
import About from "./pages/About";
import Posts from "./pages/Posts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import Game from "./pages/Game/Game.html";
import "./styles/App.css"
import Navbar from "./components/Navbar/Navbar";

function App() {
    return(
        <BrowserRouter>
            <Navbar/>

            <Routes>
                <Route path="/about" element={<About/>}/>
                <Route path="/counter" element={<Posts/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/account" element={<Account/>}/>
                <Route path="/game" element={<Game/>}/>
                <Route
                    path="*"
                    element={<Navigate to="/about" replace />}/>
            </Routes>

        </BrowserRouter>
    )
}

export default App;
