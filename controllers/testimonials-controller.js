const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Testimonial = require("../models/testimonial");

const getTestimonials = async (req, res, next) => {
  let testimonials;

  try {
    testimonials = await Testimonial.find();
  } catch (err) {
    const error = new HttpError(
      "Fetching testimonials failed. Please, try again later.",
      500
    );
    return next(error);
  }

  if (!testimonials || testimonials.length === 0) {
    return next(new HttpError("Could not find testimonials.", 404));
  }

  res.json({
    testimonials: testimonials.map((testimonial) =>
      testimonial.toObject({ getters: true })
    ),
  });
};

const createTestimonial = async (req, res, next) => {
  const { name, description, suburb } = req.body;

  if ((name && name.length > 20) || (description && description.length > 300)) {
    const error = new HttpError(
      "Name and description can be maximum 20 and 300 characters long, respectively.",
      500
    );
    return next(error);
  }
  if (!name || !description || !suburb) {
    const error = new HttpError(
      "Name, testimonial content and suburb are required fields.",
      500
    );
    return next(error);
  }

  const createdTestimonial = new Testimonial({
    name,
    description,
    suburb,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdTestimonial.save({ sessiosn: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating testimonial failed. Please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ testimonial: createdTestimonial });
};

const updateTestimonial = async (req, res, next) => {
  const { name, description, suburb } = req.body;
  const testimonialId = req.params.tid;

  if ((name && name.length > 20) || (description && description.length > 300)) {
    const error = new HttpError(
      "Name and description can be maximum 20 and 300 characters long, respectively.",
      500
    );
    return next(error);
  }

  let testimonial;

  try {
    testimonial = await Testimonial.findById(testimonialId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update testimonial.",
      500
    );
    return next(error);
  }

  if (name) {
    testimonial.name = name;
  }
  if (description) {
    testimonial.description = description;
  }
  if (suburb) {
    testimonial.suburb = suburb;
  }

  try {
    testimonial = await testimonial.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update testimonial.",
      500
    );
    return next(error);
  }

  res
    .status(200)
    .json({ testimonial: testimonial.toObject({ getters: true }) });
};

const deleteTestimonial = async (req, res, nex) => {
  const testimonialId = req.params.tid;

  let testimonial;
  try {
    testimonial = await Testimonial.findById(testimonialId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete testimonial",
      500
    );
    return next(error);
  }
  if (!testimonial) {
    const error = new HttpError("Cold not find testimonial for this id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await testimonial.remove({ sessiosn: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete testimonial",
      500
    );
    return next(error);
  }

  res.status(200).json({ massage: "Deleted testimonial." });
};

exports.getTestimonials = getTestimonials;
exports.createTestimonial = createTestimonial;
exports.updateTestimonial = updateTestimonial;
exports.deleteTestimonial = deleteTestimonial;
