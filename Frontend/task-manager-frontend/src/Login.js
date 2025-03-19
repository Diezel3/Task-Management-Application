import React, { useState, useEffect, useRef } from 'react';
import { loginUser } from './api/api';
import './authStyles.css';

const Login = ({ onLoginSuccess, onSwitchToRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const savedUsername = localStorage.getItem('rememberedUsername');
        if (savedUsername) {
          setUsername(savedUsername);
          setRememberMe(true);
        }
      }, []);
      

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent browser from refreshing the page

        if (rememberMe) {
            localStorage.setItem('rememberedUsername', username);
          } else {
            localStorage.removeItem('rememberedUsername');
          }

        if (!username.trim()) {
            alert("Username is required!");
            return;
        }

        if (!password.trim()) {
            alert("Password is required!");
            return;
        }

        try {
            const response = await loginUser({ 
                UserName: username, 
                Password: password 
            });
    
            if (response.data.token) { // Ensure token is received
                onLoginSuccess(response.data.token, response.data.userName); // Parent handle token storage
                // alert("Login successful!");
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
            <div className="auth-form">
                <h1>Login</h1>
                <form className="auth-form2" onSubmit={handleSubmit}>
                    <input type="username" placeholder="Username" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                  
                    <div className="password-input-wrapper">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        autoComplete="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="password-input"
                    />
                    <span
                        className="toggle-password-icon"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </span>
                    </div>
                    <label className="remember-me">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    Remember Me
                    </label>
                    <p style={{fontSize: '10px', color: '#999', fontStyle: 'italic'}}>Forgot password? <span className="switch-link">Reset</span></p>
                    <button type="submit">Login</button>
                    <p>Don't have an account? <span className="switch-link" onClick={onSwitchToRegister}>Register</span></p>
                </form>
            </div>
        </div>
    );
}

export default Login;