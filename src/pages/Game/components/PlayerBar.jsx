import React, {useEffect, useState} from 'react';


const PlayerBar = (props) => {

    let itemChoice = null
    const[activeItem, setItem] = useState(false)

    useEffect(()=>{
        if(props.resetPlayerBar) {
            setItem(null)
        }
    }, [props])

    function chooseItem(event) {


        if (itemChoice == null) {
            setItem(event.target.name)
            //item.className = "game-picture_animate"
            itemChoice = 'filled'
            let selected_item = event.target.name

            props.websocket.send(JSON.stringify({
                'type': "choice_message",
                "user_id": props.id,
                'message': selected_item
            }))
        } else {
            console.log("Предмет уже выбран")
        }
    }

    return (
        <div className="game-bar">
            <div className="player-bar">
                <img className="avatar" src={require("../../../images/paper.png")}></img>
                <button className="leave-group">Уйти</button>
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