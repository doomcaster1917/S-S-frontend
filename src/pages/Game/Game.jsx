import React, {useState} from 'react';
import Enemy_bar from "./components/Enemy_bar";
import Player_bar from "./components/Player_bar";
import "../../styles/Game.css"
import axios from "axios";

const Game = () => {

    const [enemyAvatar, setEnemyAvatar] = useState(require("../../images/paper.png"))
    const [game_messages, setGameMessages] = useState('Сделайте выбор')
    const [current_user_id, setCurrent_UserId] = useState()
    const chatSocket = new WebSocket(`ws://localhost:8000/groups/12345/`);
    const game_result = document.getElementById("game-result")
    const enemy_stone = document.getElementById("stone-enemy")

    async function fetchData(){
        const data = await axios.get('http://localhost:8000/groups/12345/',
            {headers: {
                    Authorization: 'Bearer ' + localStorage.token
                }})

        setCurrent_UserId(data.data.current_user_id)

        //setEnemyAvatar(data.data.user.avatar_url)
    }
    fetchData()

    chatSocket.onopen = function(e){
        console.log("connexted")
    }

    chatSocket.onmessage = function(e) {

        const data = JSON.parse(e.data);
        console.log(current_user_id)
        if (data.user_id !== current_user_id && current_user_id) {
            setGameMessages("Противник сделал выбор")
        }


    }

    chatSocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
    };


    function sendMessage(){

        chatSocket.send(JSON.stringify({
            'type':"choice_message",
            "user_id": current_user_id,
            'message': 'stone'
        }))

    }

    return (
        <div className="game">

            <Enemy_bar enemy_avatar ={enemyAvatar}/>
            <div className="game-result" id="game-result">{game_messages}</div>
            <Player_bar websocket = {chatSocket} id={current_user_id}/>
            <input type="text" id="sendInput"/>
            <button onClick={sendMessage}>ЕБАТЬ КОПАТЬ</button>
        </div>

    );
};

export default Game;