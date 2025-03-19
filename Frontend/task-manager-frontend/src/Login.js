import React from "react";
import { loginUser } from './api/api';
import './authStyles.css';

const Login = ({ onLoginSuccess, onSwitchToRegister }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent browser from refreshing the page

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
                    <input type="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    {/* <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /> */}
                    <div className="password-input-wrapper">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
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
                    <p style={{fontSize: '10px', color: '#999', fontStyle: 'italic'}}>Forgot password? <span className="switch-link">Reset</span></p>
                    <button type="submit">Login</button>
                    <p>Don't have an account? <span className="switch-link" onClick={onSwitchToRegister}>Register</span></p>
                </form>
            </div>
        </div>
    );
}

export default Login;