import {React, useState} from 'react';
import "../styles/Register.css"

const Register = () => {

    function ass(event){
        event.preventDefault()

            fetch("http://localhost:8000/api/users/", {
                method: "POST",
                body: JSON.stringify(
                    {
                        "user": {
                            "first_name": event.target.first_name.value,
                            "user_id": event.target.user_id.value,
                            "password": event.target.password.value
                        }
                    }
                ),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then((response) => response.ok ? console.log('Успешная регистрация') : console.log('Ошибка регистрации'))


    }

    function logout(){
        localStorage.token = ''
        console.log(localStorage.token)
    }

    return (

        <div className="register">
            <h1>Регистрация</h1>
            <form action="submit" className="register" onSubmit={ass} method="POST">
            <input type="text" placeholder="User_id" name="user_id"/>
                <br/>
            <input type="text" placeholder="First_name" name="first_name"/>
                <br/>
            <input type="text" placeholder="Password" name="password"/>
                <br/>
                <button type="submit">Отправить</button>

            </form>
            <button onClick={logout}>Выйти</button>
         </div>
    );
};

export default Register;