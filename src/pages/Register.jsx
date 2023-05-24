import {React, useState} from 'react';
import "../styles/Register.css"

const Register = () => {

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
            fetch("http://localhost:8000/api/users/", {
                method: "POST",
                body: JSON.stringify(
                    {
                        "user": {
                            "username": event.target.username.value,
                            "email": event.target.email.value,
                            "password": event.target.password.value
                        }
                    }
                ),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then((response) => response.ok ? setError('Успешная регистрация') : setError('Ошибка регистрации'))


    }
    }


    return (

        <div className="register">
            <h1>Регистрация</h1>
            <form action="submit" className="register" onSubmit={ass} method="POST">
            <input type="text" placeholder="E-mail" name="email"/>
                <br/>
            <input type="text" placeholder="Username" name="username"/>
                <br/>
            <input type="text" placeholder="Password" name="password"/>
                <br/>
                <button type="submit">Отправить</button>
            </form>
            {error && <h2 style={{color: 'red'}}>{error}</h2>}
        </div>
    );
};

export default Register;