import React, {FormEvent, useState} from 'react';
import './Login.scss'
import {BrowserRouter, Link, useNavigate} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event:React.SyntheticEvent) => {
        event.preventDefault();

        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });


        if (response.ok) {
            const data = await response.json();

            localStorage.setItem('token', data.token);
            console.log("test",localStorage.getItem('token'))

            navigate('/main');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login-card">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>
                        Email:
                        <input type="email" value={email}
                               onChange={(event) => setEmail(event.target.value)}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Password:
                        <input type="password" id="password" name="password" value={password}
                               onChange={(event) => setPassword(event.target.value)} />
                    </label>
                </div>
                {error && <div className="error">{error}</div>}
                <button type="submit">Login</button>

                <Link to="#">Don't have an account? Click here to register</Link>
            </form>
        </div>

);
}
export default Login;


