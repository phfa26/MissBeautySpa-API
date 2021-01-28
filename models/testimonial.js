const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const testimonialSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    suburb: { type: String, required: true }
});

module.exports = mongoose.model("Testimonial", testimonialSchema);
