import React, {useEffect, useState} from 'react';
import './Register.scss'

function Register() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


        async function registerUser() {
            const registrationData = {userName, email, password};

            try {
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(registrationData)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                // Handle success
                console.log('User registered successfully');
            } catch (error) {
                console.error('There was an error registering the user', error);
            }
        }


    const handleSubmit = (event:React.SyntheticEvent) => {
        event.preventDefault();
        registerUser();
    };


    return (
        <div className="register-card">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} >
                <label htmlFor="name">
                    Name
                    <input type="text" id="name" name="name" placeholder="Enter your name"
                           value={userName}
                           onChange={(e) => setUserName(e.target.value)}
                    />
                </label>
                <label htmlFor="email">
                    Email
                    <input type="email" id="email" name="email" placeholder="Enter your email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label htmlFor="password">
                    Password
                    <input type="password" id="password" name="password" placeholder="Enter your password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type="submit" >Submit</button>
            </form>
        </div>

);
}
export default Register

