import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";


const InvitesList = (props) => {

    const chatSocket = props.websocket
    const invited = props.invite
    const navigate = useNavigate();

    function acceptGame(){
        chatSocket.current.send(JSON.stringify({
            'type':"accept_game",
            'owner_id': invited.inviter_user_id,
            'guest_id': Number(localStorage.current_user_id)
        }))
        navigate("/game")
    }

    return (
        <div id="my-invitation">
            {invited?<div>
                <p>{invited.inviter_username} invites you to game </p>
                <button onClick={acceptGame}>Accept</button>
            </div>:null}

        </div>
    );
};

export default InvitesList;
