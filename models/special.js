const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const specialSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    specialBanner: { type: String, required: true },
    specialBannerMobile: { type: String, required: true },
});

module.exports = mongoose.model("Special", specialSchema);
