const { Router } = require("express");
const authController = require("../controllers/Authcontroller");
const { checkUser } = require("../middleware/authMiddleware");

const router = Router();

router.post("/login", authController.login_post);
router.post("/signup", authController.signup_post);
router.get("/logout", authController.logout_get);
router.get("/getUser", checkUser, authController.getUser_get);
module.exports = router;
