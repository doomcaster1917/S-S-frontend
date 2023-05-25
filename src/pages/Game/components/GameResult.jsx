import {React, useEffect} from 'react';
import "../../../styles/GameResult.css"

const GameResult = (props) => {

    if(props.restart_game){
        function updateResult() {
            props.game_result = 'Сделайте выбор'
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