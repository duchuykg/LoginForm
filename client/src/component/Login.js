import React, { useState } from "react";

const LoginForm = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [showPassword, setShowPassword] = useState(false);

const handleLogin = async (event) => {
    event.preventDefault();
};

const toggleShowPassword = () => {
    setShowPassword(!showPassword);
};

return (
    <div className="login-form">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
            <div className="form-group">
            <input
                type="email or username"
                placeholder="Email or username"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            <div className="form-group">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <span className="show-password" onClick={toggleShowPassword}>
                    {showPassword ? <>&#128083;</> : <>&#128065;</>}
                </span>
            </div>
            <button className={email && password ? "active" : ""} 
                    type="submit" 
                    disabled={email && password ? false : true
            }> Login</button>
        </form>
    </div>
);
};

export default LoginForm;