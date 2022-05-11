const { Router } = require("express");
const postController = require("../controllers/Postcontroller");

const router = Router();

router.post("/compose", postController.compose_post_method);
router.post("/answer", postController.answer_post_method);
router.get("/getAcademic", postController.get_academic_method);
router.get("/getClub", postController.get_club_method);
router.get("/getCocurricular", postController.get_cocurricular_method);
router.get("/getAllPost", postController.get_all_post_get_method);
router.get("/getAnswer/:id", postController.get_answer_get_method);
module.exports = router;
