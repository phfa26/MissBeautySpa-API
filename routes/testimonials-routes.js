const express = require('express')

const testimonialsControllers = require("../controllers/testimonials-controller");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();


router.get("/", testimonialsControllers.getTestimonials);

router.use(checkAuth)

router.post("/", testimonialsControllers.createTestimonial);

router.patch("/:tid", testimonialsControllers.updateTestimonial);

router.delete("/:tid", testimonialsControllers.deleteTestimonial);


module.exports = router;