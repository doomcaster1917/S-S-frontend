import {React, useEffect} from 'react';
import "../../../styles/Game.css"

const GameResult = (props) => {

    if(props.restart_game){
        function updateResult() {
            props.game_result = 'Make your choice'
        }
        setTimeout(updateResult, 4000);
    }

    return (
        <div className="game-result">
            <h3 id="result">{props.game_result}</h3>
        </div>
    );
};

export default GameResult;
