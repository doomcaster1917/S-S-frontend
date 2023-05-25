import React, {useState} from 'react';
import "../../styles/home.css"
import bridge from '@vkontakte/vk-bridge';
import axios from "axios";

const Home = () => {

    const[userData, setUserData] = useState()

    bridge.send("VKWebAppInit", {});

    bridge.send('VKWebAppGetUserInfo', {})
        .then((data) => setUserData(data)).catch((error) => console.log(error));

    async function sendRegisterData(){
        axios.post('http://127.0.0.1:8000/users/', {
            "user": {
            user_id: userData.id,
            first_name: userData.first_name,
            last_name: userData.last_name,
            avatar_url: userData.photo_max_orig
            }
        })
            .then(function (response) {
                localStorage.resistered = true;
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    if(!localStorage.resistered){
        sendRegisterData()
    }

    return (
        <div>
            <img src={userData.photo_max_orig} alt=""/>
        </div>
    );
};

export default Home;