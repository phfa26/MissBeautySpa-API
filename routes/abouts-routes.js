const express = require('express')

const aboutsControllers = require("../controllers/abouts-controller");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();


router.get("/", aboutsControllers.getAbout);

router.use(checkAuth)

// router.post("/", aboutsControllers.createAbout);

router.patch("/", aboutsControllers.updateAbout);


module.exports = router;