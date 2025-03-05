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
    
            if (response.data.token) { // Ensure token is received
                localStorage.setItem('token', response.data.token); // Store token
                alert("Login successful!");
                console.log("Token stored:", response.data.token);
            } else {
                alert("No token received. Please try again.");
            }
        } 
        catch (error) {
            console.error(error);
            alert("Login failed! Check your credentials.");
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