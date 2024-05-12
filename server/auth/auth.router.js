const  webFramework = require("express");
const router = webFramework.Router();

const AuthController = require("./auth.controller");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/confirm", AuthController.confirm);
router.post("/getTokenGithub", AuthController.getTokenGithub);
router.get("/getUserData", AuthController.getUserDataGithub);


module.exports = router;