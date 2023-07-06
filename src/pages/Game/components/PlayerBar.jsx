import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";


const PlayerBar = (props) => {

    const[activeItem, setactiveItem] = useState(null)
    const chatSocket = props.websocket
    const navigate = useNavigate();

    useEffect(()=>{
        if(props.resetPlayerBar) {
            console.log(props.resetPlayerBar)
            setactiveItem(null)
        }
    }, [props])

    function chooseItem(event) {
        if (activeItem == null) {
            setactiveItem(event.target.name)
            chatSocket.current.send(JSON.stringify({
                'type': "choice_message",
                "user_id": localStorage.current_user_id,
                'message': event.target.name
            }))
        } else {
            console.log("the item is already chosen")
        }
    }

    function exitGame(){
       navigate("/home")
    }

    return (
        <div className="game-bar">
            <div className="player-bar">
                <img className="avatar" src={props.player_avatar}></img>
                <button className="leave-group" onClick={exitGame}>Leave</button>
            </div>
            <div className="set-bar">
                <img className={activeItem == 'stone'?"game-picture_animate":"game-picture"} onClick={chooseItem} name="stone"   id="stone-player" src={require("../../../images/stone.png")}></img>
                <img className={activeItem == 'scissors'?"game-picture_animate":"game-picture"} onClick={chooseItem} name="scissors" id="scissors-player" src={require("../../../images/scissors.png")}></img>
                <img className={activeItem == 'paper'?"game-picture_animate":"game-picture"} onClick={chooseItem} name="paper"    id="paper-player" src={require("../../../images/paper.png")}></img>
            </div>
        </div>
    );
};

export default PlayerBar;
