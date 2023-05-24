import React from 'react';

const Player_bar = () => {
    return (
        <div className="game-bar">
            <div className="player-bar">
                <img className="avatar" src={require("../../../images/paper.png")}></img>
                <button className="leave-group">Уйти</button>
            </div>
            <div className="set-bar">
                <div className="game-picture" id="stone-player"></div>
                <div className="game-picture" id="scissors-player"></div>
                <div className="game-picture" id="paper-player"></div>
            </div>
        </div>
    );
};

export default Player_bar;