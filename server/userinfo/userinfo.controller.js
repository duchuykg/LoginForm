const userInfoModel = require('./userinfo.model');

class UserInfoController {
  async getUserInfo(req, res) {
    console.log(req.query);
    const { email } = req.query;

    try {
      const user = await userInfoModel.findOne({ login: email });

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