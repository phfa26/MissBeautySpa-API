const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Service = require("../models/service");

const getServices = async (req, res, next) => {
  let services;

  try {
    services = await Service.find();
  } catch (err) {
    const error = new HttpError(
      "Fetching services failed. Please, try again later.",
      500
    );
    return next(error);
  }

  if (!services || services.length === 0) {
    return next(new HttpError("Could not find services.", 404));
  }

  res.json({
    services: services.map((service) => service.toObject({ getters: true })),
  });
};

const createService = async (req, res, next) => {
  const { subTitle, description, category, photo } = req.body;

  if (subTitle && subTitle.length > 40) {
    const error = new HttpError(
      "Title can be maximum 40 characters long, respectively.",
      500
    );
    return next(error);
  }
  const createdService = new Service({
    subTitle,
    description,
    category,
    photo,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdService.save({ sessiosn: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating service failed. Please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ service: createdService });
};

const updateService = async (req, res, next) => {
  const { subTitle, description, category, photo } = req.body;
  const serviceId = req.params.sid;

  if (subTitle && subTitle.length > 40) {
    const error = new HttpError(
      "Title can be maximum 40 characters long, respectively.",
      500
    );
    return next(error);
  }

  let service;

  try {
    service = await Service.findById(serviceId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update service.",
      500
    );
    return next(error);
  }

  if (subTitle) {
    service.subTitle = subTitle;
  }
  if (description) {
    service.description = description;
  }
  if (category) {
    service.category = category;
  }
  if (photo) {
    service.photo = photo;
  }

  
  try {
    service = await service.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update service.",
      500
    );
    return next(error);
  }

  res.status(200).json({ service: service.toObject({ getters: true }) });
};

const deleteService = async (req, res, nex) => {
  const serviceId = req.params.sid;

  let service;
  try {
    service = await Service.findById(serviceId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete service",
      500
    );
    return next(error);
  }
  if (!service) {
    const error = new HttpError("Cold not find service for this id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await service.remove({ sessiosn: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete service",
      500
    );
    return next(error);
  }

  res.status(200).json({ massage: "Deleted service." });
};

exports.getServices = getServices;
exports.createService = createService;
exports.updateService = updateService;
exports.deleteService = deleteService;
