const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  subTitle: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  photo: { type: String, required: true }
});

module.exports = mongoose.model("Service", serviceSchema);
