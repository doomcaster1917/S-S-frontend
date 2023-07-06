import React, {useEffect, useState} from 'react';
import axios from "axios";

const Invite = (props) => {
    const[users, setUsers] = useState([])

    const chatSocket = props.websocket
    

    useEffect(() => {
        const response = axios.get('https://api.webtalestoday.ru/users')
        response.then( result => setUsers(cleanUsersList(result.data)))
    }, [])

    function cleanUsersList (array){
        const user_ids = array.map(user=>user.user_id)
        const index = user_ids.indexOf(Number(localStorage.current_user_id));
        if (index > -1) array.splice(index, 1);
        return array
    }

    function inviteToGame(){
        const player_to_invite = document.getElementById("selectEnemy").value
        chatSocket.current.send(JSON.stringify({
            'type':"invite",
            'user_id': player_to_invite,
            'inviter_user_id': Number(localStorage.current_user_id)
        }))

    }

    return (
        <div id="invite">
            <select name="players" id="selectEnemy" size={users.length}>{users.map(user =>

                <option value={user.user_id} key={user.user_id}>{`${user.first_name} ${user.last_name}`}</option>)}
            </select>
            <button className="invite-button" onClick={inviteToGame}>Invite to game</button>
        </div>
    );
};

export default Invite;
