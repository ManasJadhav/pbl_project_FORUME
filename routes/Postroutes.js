const { Router } = require("express");
const postController = require("../controllers/Postcontroller");
const { checkUser } = require("../middleware/authMiddleware");

const router = Router();

router.post("/compose", checkUser, postController.compose_post_method);
router.post("/answer", checkUser, postController.answer_post_method);
router.get("/getAcademic", checkUser, postController.get_academic_method);
router.get("/getClub", checkUser, postController.get_club_method);
router.get(
  "/getCocurricular",
  checkUser,
  postController.get_cocurricular_method
);
router.get("/getAllPost", checkUser, postController.get_all_post_get_method);
router.get("/getAnswer/:id", checkUser, postController.get_answer_get_method);
module.exports = router;
