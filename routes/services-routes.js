const express = require('express')

const servicesControllers = require("../controllers/services-controller");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();


router.get("/", servicesControllers.getServices);

router.use(checkAuth)

router.post("/", servicesControllers.createService);

router.patch("/:sid", servicesControllers.updateService);

router.delete("/:sid", servicesControllers.deleteService);


module.exports = router;