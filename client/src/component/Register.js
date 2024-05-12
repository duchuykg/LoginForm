import React, { useState } from "react";
import { registerAPI } from "../api/register";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [isRegister, setisRegister] = useState(false);

    const handleRegister = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Password and confirm password do not match");
            return;
        }
        try {
           await registerAPI(email, password, confirmPassword);
           setisRegister(true)
        } catch (error) {
            if (error.response.status === 400) {
                window.alert("Email already exists");
            } else if (error.response.status === 401) {
                alert("Password and confirm password do not match");
            } else if (error.response.status === 400) {
                alert("An error occurred during registration");
            }
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowPassword2 = () => {
        setShowPassword2(!showPassword2);
    };

return (
    <div className="login-form">
        <h2>Register</h2>

        <form onSubmit={handleRegister}>
            <div className="form-group">
            <input
                type="email"
                placeholder="Email"
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
            <div className="form-group">
                <input
                    type={showPassword2 ? "text" : "password"}
                    placeholder="Confirm Password"
                    id="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span className="show-password" onClick={toggleShowPassword2}>
                    {showPassword2 ? <>&#128083;</> : <>&#128065;</>}
                </span>
            </div>
            <div className="create-account">
                <a href="/" className="create-account-link">Back to Login</a>
            </div>
            <button className={email && password && confirmPassword ? "active" : ""}
                    type="submit" 
                    disabled={email && password && confirmPassword ? false : true
            }> Register</button>
            {
            isRegister ?
            <div className="create-account">
               <p className="create-account-link">Kiểm tra Email và xác nhận !</p>
            </div>
            : <></>
            }
        </form>
    </div>
);
};

export default Register;