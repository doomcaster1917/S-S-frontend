import React from 'react';

const Player_bar = (props) => {

    let itemChoice = null

    function chooseItem(event){

        let item = document.getElementById(event.target.id)

        if(itemChoice == null){
            item.style.background = "blue"
            itemChoice = 'filled'
        } else {
            console.log("Предмет уже выбран")
        }
        props. websocket.send(JSON.stringify({
            'type':"choice_message",
            "user_id": props.id,
            'message': event.target.name
        }))
    }
    return (
        <div className="game-bar">
            <div className="player-bar">
                <img className="avatar" src={require("../../../images/paper.png")}></img>
                <button className="leave-group">Уйти</button>
            </div>
            <div className="set-bar">
                <img onClick={chooseItem} name="stone" className="game-picture-player" id="stone-player" src={require("../../../images/stone.png")}></img>
                <img onClick={chooseItem} name="scissors" className="game-picture-player" id="scissors-player" src={require("../../../images/scissors.png")}></img>
                <img onClick={chooseItem} name="paper" className="game-picture-player" id="paper-player" src={require("../../../images/paper.png")}></img>
            </div>
        </div>
    );
};

export default Player_bar;