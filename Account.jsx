import React, {useState} from 'react';
import "../styles/Login.css"

const Account = () => {

    function ass(event){

            fetch("http://localhost:8000/api/user")
                .then((response) => response.json()).
                //response.ok ? setError('Успешная регистрация') : setError('Ошибка регистрации'), response.json()).
                then(result => console.log(result))
}

    return (
        <div className="login">
            <h1>Аутентификация</h1>

            <button type="submit" onClick={ass}>Отправить</button>

        </div>
    );
};

export default Account;