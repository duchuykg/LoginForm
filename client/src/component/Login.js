import React, { useEffect, useState } from "react";
import { loginAPI } from "../api/login";
import { loginGithub } from "../api/loginGithub";
import queryString from "query-string";
import Profile from './Profile';
import { LINK_CLIENT } from "../constant";
import { getUser } from "../api/getUser";

const LoginForm = () => {
    const redirect_uri =
    "https://api.utteranc.es/authorize?redirect_uri=" +
    encodeURIComponent(LINK_CLIENT)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [utterancesParam, setUtterancesParam] = useState("")

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const res = await loginAPI(email, password);
            localStorage.setItem("token", res.data.token);
            const user = await getUser(res.data.email)
            localStorage.setItem("user_data", JSON.stringify(user.user));
            window.location.reload()
        } catch (error) {
             if (error.response.status === 400) {
                window.alert("Email is not confirmed");
             } else if (error.response.status === 401) {
                window.alert("Invalid password");
             }
             else if (error.response.status === 404) {
                window.alert("User not found");
            }
        }
        
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };


    let utterancesParam1
    if (localStorage.getItem("utterances-session")) {
        utterancesParam1 = localStorage.getItem("utterances-session")
    }
    const data = {
        data: utterancesParam1,
    }
    const handleloginGithub = async () => {
        await loginGithub(data)
        // window.location.reload()
    };

    useEffect(() => {
        const urlParams = new queryString.parse(window.location.search)
        const utterancesValue = urlParams.utterances
        if (utterancesValue) {
          setUtterancesParam(utterancesValue)
          localStorage.setItem("utterances-session", utterancesValue)
        }

        if (localStorage.getItem("utterances-session")) {
            handleloginGithub()
        }
    }, [localStorage.getItem("token") ])
    
    

return (
    <div>
        {
        localStorage.getItem("token") || utterancesParam ?
        <div>
            <Profile />
        </div>
        
        :
        <div className="login-form">
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
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
                <div className="create-account">
                    <a href="/register" className="create-account-link">Create Account</a>
                </div>
                <button className={email && password ? "active" : ""} 
                        type="submit" 
                        disabled={email && password ? false : true
                }> Login</button>

                <div className="login-github" onClick={handleloginGithub}>
                    <p><a href={redirect_uri} className="login-github-link">Sign in with Github</a></p>
                </div>
            </form>
        </div>
        }
    </div>
);
};

export default LoginForm;