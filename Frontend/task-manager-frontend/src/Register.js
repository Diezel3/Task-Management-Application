import React, {useState} from "react";
import { registerUser } from './api/api';
import './authStyles.css';

const Register = ({ onSwitchToLogin }) => {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent browser from refreshing the page

        if (!username.trim()) {
            alert("Username is required!");
            return;
        }

        if (!email.trim()) {
            alert("Email is required!");
            return;
        }

        function isValidPassword(password) {
            if (password.length < 8) {
                alert("Password must be at least 8 characters long.");
                return false;
            }
            if (!/[A-Z]/.test(password)) {
                alert("Password must contain at least one uppercase letter.");
                return false;
            }
            if (!/[a-z]/.test(password)) {
                alert("Password must contain at least one lowercase letter.");
                return false;
            }
            if (!/\d/.test(password)) {
                alert("Password must contain at least one digit.");
                return false;
            }
            if (!/[^A-Za-z0-9]/.test(password)) {
                alert("Password must contain at least one special character.");
                return false;
            }
        
            return true;
        }
        
        
        if (!isValidPassword(password)) {
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await registerUser({ 
                UserName: username, 
                Email: email, 
                Password: password 
            });

            alert("User registered successfully!");
            onSwitchToLogin(); // Switch to login after successful registration
        } 
        catch (error) {
            if (Array.isArray(error.response?.data)) {
                // Display each error on a new line
                alert(error.response.data.join("\n"));
              } 
              else {
                alert("Failed to register user. Please try again.");
              }
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Register</h2>
                <form className="auth-form2"onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <label>Confirm Password:</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <button type="submit">Register</button>
                    <p>Already have an account? <span className="switch-link" onClick={onSwitchToLogin}>Login</span></p>
                </form>
            </div>
        </div>
    );
}

export default Register;