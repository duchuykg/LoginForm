const userModel = require('../user/user.model')
const userInfo = require('../userinfo/userinfo.model')

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

class authController {
    register = async function (req, res) {
        try {
            const { email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new userModel({ email, password: hashedPassword });
            
            await newUser.save();   
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    login = async function (req, res) {
        try {
            const { email, password } = req.body;
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log(isPasswordValid)
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
}

module.exports = new authController();