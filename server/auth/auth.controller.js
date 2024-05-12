const userModel = require('../user/user.model')
const userInfoModel = require('../userinfo/userinfo.model')

const LINK_CLIENT = "http://localhost:3000"
const sendEmail = require('../sendEmail')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const axios = require('axios');
class authController {
    async register (req, res) {
        try {
            const { email, password, confirmpassword } = req.body;

            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            if (password !== confirmpassword) {
                return res.status(401).json({ message: 'Password and confirm password do not match' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new userModel({ email, password: hashedPassword });
            
            const token = jwt.sign(
                {
                    email,
                },
                "RANDOM-TOKEN",
                { expiresIn: "24h" }
            );

            sendEmail(email, token)
            await newUser.save();   
            

            res.status(201).json({ message: 'Please Verify Email' });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async login (req, res) {
        try {
            const { email, password } = req.body;
            const user = await userModel.findOne({ email });
            console.log(1)
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            if (user.isConfirmed === false){
                return res.status(400).json({ error: 'Email is not confirmed' });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid password' });
            }

            const token = jwt.sign(
                {
                    userId: user._id,
                    userEmail: user.email,
                },
                "RANDOM-TOKEN",
                { expiresIn: "24h" }
            );

            res.status(200).json({
                message: 'Login successful',
                email: user.email,
                token,
            });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async confirm (req, res) {
        try {
            const { token } = req.query;

            const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");

            const valuetoken = await decodedToken;
            const email = valuetoken.email

            const user = await userModel.findOne({
                email,
            });
            
            if (user) {
                const newUserInfo = new userInfoModel({ 
                    login: email,
                    name: "",
                    avatar: "",
                    role: "user"
                });

                user.isConfirmed = true;
                await user.save();
                await newUserInfo.save();   
                res.redirect(LINK_CLIENT);
            } else {
                res.status(400).send('Mã xác nhận không hợp lệ');
            }

        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getTokenGithub(req, res) {
        try {
            const data = req.body.data;

            const config = {
                method: "POST",
                maxBodyLength: Infinity,
                url: "https://api.utteranc.es/token",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            const response = await axios.request(config);

            res.json(response.data);
        } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async getUserDataGithub(req, res) {
        try {
            req.get("Authorization")
            const config = {
                method: 'GET',
                maxBodyLength: Infinity,
                url: 'https://api.github.com/user',
                headers: { 
                    'Accept': 'application/vnd.github.v3+json', 
                    'Authorization': req.get("Authorization")
                }
            };    

            const response = await axios.request(config);
            const existingUser = await userInfoModel.findOne({ login: response.data.login });

            if (!existingUser){
                const userItem = new userInfoModel({
                    login: response.data.login,
                    name: response.data.name,
                    avatar: response.data.avatar_url,
                    role: "user",
                });
                await userItem.save();
                res.json(userItem);
            } else {
                res.json(existingUser);
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal Server Login Error" });
        }
    }
}

module.exports = new authController();