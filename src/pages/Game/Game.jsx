import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import EnemyBar from "./components/EnemyBar";
import PlayerBar from "./components/PlayerBar";
import GameResult from "./components/GameResult";
import {useNavigate} from "react-router-dom";
import "../../styles/Game.css"
import axios from "axios";

const Game = () => {

    const [gameData, setGameData] = useState(require("../../images/paper.png"))
    const [game_messages, setGameMessages] = useState('Make your choice')
    const [enemyChoice, setEnemyChoice] = useState()
    const [resetPlayerBar, setResetPlayerBar] = useState()
    const [isConnectionLoading, setConnectionLoading] = useState(false)
    const chatSocket = useRef(null);
    const navigate = useNavigate();

    function reset(){
        setEnemyChoice(null)
        setGameMessages('Make your choice')
        setResetPlayerBar(true)
        setResetPlayerBar(false)
    }


    useEffect(() => {
        const asyncMethod = async () => {
            setConnectionLoading(true)
            const response = await axios.post('https://api.webtalestoday.ru/game',
                {user_id: localStorage.current_user_id}).catch(error => console.log(error))

            if (response) {
                const data = JSON.parse(response.data)
                chatSocket.current = new WebSocket(`wss://api.webtalestoday.ru/groups/${data.group_id}/`)
                chatSocket.current.onopen = () => console.log("ws opened");
                chatSocket.current.onclose = () => console.log("ws closed");
                setGameData(data)

                setConnectionLoading(false)
                console.log('Connection loaded')
                return chatSocket.current

            }
        }
        const chatSocketCurrent = asyncMethod();
        return () => {
            chatSocketCurrent.then(result => result.close());
        }
    }, [])



    useEffect(() => {
        async function isFilled(value) {
            if (!value) setTimeout(await isFilled(value), 150)
            else return value
        }
        const secondAsyncMethod = async () => {
            
            console.log(chatSocket.current)
            chatSocket.current.onmessage = function(e) {
                const data = JSON.parse(e.data);
                console.log(data)

                if (data.type === "choice_message" && data.user_id !== localStorage.current_user_id) {
                    setGameMessages("The enemy have made a choice")
                } else if (data.type === "win_message") {
                    if (localStorage.current_user_id && data.winner_id !== localStorage.current_user_id) {
                        setGameMessages("You lost")
                        setEnemyChoice(data.winner_choice)
                    } else if (localStorage.current_user_id) {
                        setGameMessages("You won")
                        setEnemyChoice(data.looser_choice)
                    }
                    setTimeout(reset, 7000)
                } else if (data.type === "draw_message") {
                    setEnemyChoice(data.choice)
                    setGameMessages("Was a draw")
                    setTimeout(reset, 7000)
                } else if (data.type === "exit") {
                    setGameMessages('Your partner has left the game')
                    setTimeout(() =>{
                        reset()
                        navigate("/home")
                    }, 7000)
                }

            }

        }
        secondAsyncMethod();
    }, [chatSocket.current])



    const enemyAvatar = gameData.enemy_user_avatar
    const player_avatar = gameData.current_user_avatar
    const enemyUsername = gameData.enemy_user_name

    return (
        <div className="game">

            <EnemyBar enemy_avatar ={enemyAvatar} enemyUsername={enemyUsername} enemyChoice={enemyChoice}/>

            {isConnectionLoading? <h1>Connection loading</h1>:<GameResult game_result = {game_messages}/>}

            <PlayerBar websocket = {chatSocket} player_avatar ={player_avatar} resetPlayerBar={resetPlayerBar}/>

        </div>

    );
};

export default Game;
