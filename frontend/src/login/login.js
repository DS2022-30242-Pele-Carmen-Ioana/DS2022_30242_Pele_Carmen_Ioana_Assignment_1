import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Login.css';
async function loginUser(credentials) {
    return fetch('http://localhost:8082/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

const Login=()=> {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [credentials, setCredentials] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        console.log(token);
        setCredentials(token);

        window.open("/"+token.role,"_self");

    }
    useEffect(() => {
        localStorage.setItem('credentials', JSON.stringify(credentials))
    },[credentials]);
    return(
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)}/>
                </label>
                <br/>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <div>
                    <button type="submit" onClick={ handleSubmit}>Login</button>
                </div>
            </form>
        </div>
    )
}
export default Login;