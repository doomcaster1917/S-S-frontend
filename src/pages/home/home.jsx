import React, {useState, useEffect, useLayoutEffect, useRef} from 'react';
import "../../styles/home.css"
import bridge from '@vkontakte/vk-bridge';
import axios from "axios";
import Invite from "./components/Invite";
import InvitesList from "./components/InvitesList";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const[userData, setUserData] = useState({})
    const[invite, setInvite] = useState(null)
    const navigate = useNavigate();
    const chatSocket = useRef(null);

    useLayoutEffect(() => {
        bridge.send("VKWebAppInit", {}).catch((error) => {
               console.log(error);
        });
        bridge.send('VKWebAppGetUserInfo')
            .then(response => setUserData(response))

    }, [bridge])


    useEffect(() => {
        chatSocket.current = new WebSocket(`wss://api.webtalestoday.ru/home`)
        chatSocket.current.onopen = () => console.log("ws opened");
        chatSocket.current.onclose = () => console.log("ws closed");

        const chatSocketCurrent = chatSocket.current;

        return () => {
            chatSocketCurrent.close();
        };
    }, [])

    useEffect(() => {

        if (!chatSocket.current) return;
        chatSocket.current.onmessage = function(event) {
            const data = JSON.parse(event.data);
            console.log(data);
            if (data.type === "invite"){
                if(Number(data.user_id) === Number(userData.id)){
                    setInvite({'inviter_username': data.inviter_username, 'inviter_user_id':data.inviter_user_id})
                }}
            else if(data.type === "accept_game" && ((data.owner_id||data.guest_id) === userData.id)){
                navigate("/game")
            }}}, [chatSocket.current]);



    function registerUser(){
        console.log(`Userid for register is ${userData.id}`)
        axios.post('https://api.webtalestoday.ru/api/users/', {
            user: {
                user_id: userData.id,
                first_name: userData.first_name,
                last_name: userData.last_name,
                avatar_url: userData.photo_max_orig
            }})
            .then(function (response) {
                localStorage.current_user_id = userData.id;
                console.log(`response is ${response}`)
            })
            .catch(function (error) {
                localStorage.current_user_id = userData.id; // for case when localstorage is cleared, but user s already registered
                console.log(error);
            });
    }

    if(userData.id && Number(localStorage.current_user_id) !== userData.id){
        registerUser()
    }

    return (
        <div>
            <div className="tooltip">
                <InvitesList websocket={chatSocket} invite={invite}/>
                <Invite websocket={chatSocket}/>
            </div>
        </div>
    );
};

export default Home;
