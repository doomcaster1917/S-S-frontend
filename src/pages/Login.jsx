import React, {useState} from 'react';
import "../styles/Login.css"

const Login = () => {

    const [error, setError] = useState(null);

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    function ass(event){
        event.preventDefault()

        if (!isValidEmail(event.target.email.value)) {
            setError('Email is invalid');
        } else {
            setError(null);
            fetch("http://localhost:8000/api/users/login/", {
                method: "POST",
                body: JSON.stringify(
                    {
                        "user": {
                            "email": event.target.email.value,
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

        }
    }

    return (
        <div className="login">
            <h1>Авторизация</h1>
            <form action="submit" className="login" onSubmit={ass} method="POST">
                <input type="text" placeholder="E-mail" name="email"/>
                <br/>
                <input type="text" placeholder="Password" name="password"/>
                <br/>
                <button type="submit">Отправить</button>
            </form>
            {error && <h2 style={{color: 'red'}}>{error}</h2>}
        </div>
    );
};

export default Login;