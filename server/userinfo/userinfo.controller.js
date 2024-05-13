const userInfoModel = require('./userinfo.model');
const jwt = require("jsonwebtoken");
class UserInfoController {
  async getUserInfo(req, res) {
    try {
      const token = await req.headers.authorization.split(" ")[1]

      if (!token) {
        return res.status(401).json({
          error: "Missing token",
        });
      }
      const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");
      
      const user = await userInfoModel.findOne({ login: decodedToken.userEmail });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.json({ user });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new UserInfoController();