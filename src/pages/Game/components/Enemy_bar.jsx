import React, {useState} from 'react';
import axios from "axios";


function setAvatar (event){
    console.log(event.target.name)
}
const Enemy_bar = (props) => {
    console.log(props.enemy_avatar.id)
    return (
        <div className="game-bar">
             <div className="player-bar">
                 <img className="avatar" src={props.enemy_avatar}></img>
                 <div className="username"></div>
             </div>
            <div className="set-bar">

                <img  className="game-picture" id="stone-enemy" src={require("../../../images/stone.png")}></img>
                <img  className="game-picture" id="scissors-enemy" src={require("../../../images/scissors.png")}></img>
                <img  className="game-picture" id="paper-enemy" src={require("../../../images/paper.png")}></img>
            </div>
        </div>
    );
};

export default Enemy_bar;