import React, {useState} from 'react';
import "../styles/Login.css"

const Login = () => {

    const [error, setError] = useState(null);

    function ass(event){
        event.preventDefault()

            fetch("http://localhost:8000/api/users/login/", {
                method: "POST",
                body: JSON.stringify(
                    {
                        "user": {
                            "user_id": event.target.user_id.value,
                            "password": event.target.password.value
                        }
                    }
                ),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then((response) => response.json()).
                //response.ok ? setError('Успешная регистрация') : setError('Ошибка регистрации'), response.json()).
                then(result => localStorage.token = result.user.token)
            console.log(localStorage.token)

        }


    return (
        <div className="login">
            <h1>Авторизация</h1>
            <form action="submit" className="login" onSubmit={ass} method="POST">
                <input type="text" placeholder="user_id" name="user_id"/>
                <br/>
                <input type="text" placeholder="Password" name="password"/>
                <br/>
                <button type="submit">Отправить</button>
            </form>

        </div>
    );
};

export default Login;