const  webFramework = require("express");
const router = webFramework.Router();

const UserInfoController = require("./userinfo.controller");

// router.post("/register", UserController.register);
router.get("/", UserInfoController.getUserInfo);

module.exports = router;