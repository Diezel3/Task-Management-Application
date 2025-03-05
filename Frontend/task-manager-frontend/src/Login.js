import React from "react";
import { loginUser } from './api/api';
import './authStyles.css';

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent browser from refreshing the page

        if (!email.trim()) {
            alert("Email is required!");
            return;
        }

        if (!password.trim()) {
            alert("Password is required!");
            return;
        }

        try {
            const response = await loginUser({ email, password });
            console.log(response);
            alert("Login successful!");
        } catch (error) {
            console.error(error);
            alert("Login failed!");
        }
    }

    return (
        <div className="auth-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}