import React, {useState} from 'react';
import "../styles/Login.css"
import axios from "axios";


const Account = () => {

    async function ass(event){
        const data = await axios.get('http://localhost:8000/api/user',
            {headers: {
                    Authorization: 'Bearer ' + localStorage.token
                }})
        console.log(data)
}

    return (
        <div className="login">
            <h1>Аутентификация</h1>

            <button type="submit" onClick={ass}>Отправить</button>

        </div>
    );
};

export default Account;