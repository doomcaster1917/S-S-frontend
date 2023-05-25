import React, {useState, useEffect} from 'react';
import EnemyBar from "./components/EnemyBar";
import PlayerBar from "./components/PlayerBar";
import GameResult from "./components/GameResult";
import "../../styles/Game.css"
import axios from "axios";

const Game = () => {

    const [enemyAvatar, setEnemyAvatar] = useState(require("../../images/paper.png"))
    const [game_messages, setGameMessages] = useState('Сделайте выбор')
    const [current_user_id, setCurrent_UserId] = useState(null)
    const [enemyChoice, setEnemyChoice] = useState()
    const [resetPlayerBar, setResetPlayerBar] = useState()
    const chatSocket = new WebSocket(`ws://localhost:8000/groups/111/`);

    function reset(){
        setEnemyChoice(null)
        setGameMessages("Сделайте выбор")
        setResetPlayerBar(true)
    }

   async function fetchData(){
    const data = await axios.get('http://localhost:8000/groups/111/',
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
        console.log(data)

        if (data.type === "choice_message" && data.user_id !== current_user_id && current_user_id) {
            console.log(data.type, "win_message", data.user_id, current_user_id)
             setGameMessages("Противник сделал выбор")
        }
        else if(data.type === "win_message"){
            if (current_user_id && data.winner_id !== current_user_id){
                setGameMessages("Вы проиграли")
                      setEnemyChoice(data.winner_choice)
            } else if(current_user_id) {
                setGameMessages("Вы выиграли")
                setEnemyChoice(data.looser_choice)
            }
            setTimeout(reset, 7000)
        }

        else if(data.type === "draw_message"){
            setGameMessages("Ничья")
        }

    }

    chatSocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
    };


     return (
        <div className="game">

            <EnemyBar enemy_avatar ={enemyAvatar} enemyChoice={enemyChoice}/>

            <GameResult game_result = {game_messages} />

            <PlayerBar websocket = {chatSocket} id={current_user_id} resetPlayerBar={resetPlayerBar}/>

        </div>

    );
};

export default Game;