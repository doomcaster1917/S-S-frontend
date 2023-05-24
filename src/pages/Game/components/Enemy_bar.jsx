import React, {useState} from 'react';
import axios from "axios";


function setAvatar (){

}
const Enemy_bar = (props) => {
    console.log(props.enemy_avatar)
    return (
        <div className="game-bar">
             <div className="player-bar">
                 <img className="avatar" src={props.enemy_avatar}></img>
                 <div className="username"></div>
             </div>
            <div className="set-bar">
                <div className="game-picture" id="stone-enemy"></div>
                <div className="game-picture" id="scissors-enemy"></div>
                <div className="game-picture" id="paper-enemy"></div>
            </div>
        </div>
    );
};

export default Enemy_bar;