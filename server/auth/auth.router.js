const  webFramework = require("express");
const router = webFramework.Router();

const AuthController = require("./auth.controller");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);


module.exports = router;