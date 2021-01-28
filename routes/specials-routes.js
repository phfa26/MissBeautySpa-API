const express = require('express')

const specialsControllers = require("../controllers/specials-controller");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();


router.get("/", specialsControllers.getSpecial);

router.use(checkAuth)

// router.post("/", specialsControllers.createSpecial);

router.patch("/", specialsControllers.updateSpecial);


module.exports = router;