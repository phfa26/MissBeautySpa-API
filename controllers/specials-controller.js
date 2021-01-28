const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Special = require("../models/special");

const getSpecial = async (req, res, next) => {
  let special;

  try {
    special = await Special.find();
  } catch (err) {
    const error = new HttpError(
      "Fetching special failed. Please, try again later.",
      500
    );
    return next(error);
  }

  if (!special || special.length === 0) {
    return next(new HttpError("Could not find special.", 404));
  }
  res.json({ special });
};

//
/*  

***** THIS CODE SHOULD ONLY BE ADDED TO FIRST CREATE AN SPECIAL, AS THERE IS ONLY A SINGLE SPECIAL ON THE PROJECT.
***** ALL THAT CAN BE DONE AFTERWARDS IS TO EDIT IT
***** IF YOU EVER NEED TO CREATE A NEW SPECIAL, JUST UNCOMMENT THE BELLOW CODE AND CREATE A POST REQUEST TARGETING '/'
***** COMMENT CODE BACK AFT FOR SECURITY REASONS.
***** MAKE SURE TO HAVE ONLY A SINGLE ENTRY IN YOUR DB FOR AN SPECIAL!
***** DON'T FORGET TO UPDATE SPECIAL ID ON THE UPDATE SPECIAL SECTION, AS THE ID IS HARDCODED
***** THANK YOU!

*/
//
//
// const createSpecial = async (req, res, next) => {

//     const { title, description, specialBanner, specialBannerMobile } = req.body;

//     const createdAbout = new Special({
//         title,
//         description,
//         specialBanner,
//         specialBannerMobile,
//     });

//     if (title.length > 20) {
//         const error = new HttpError(
//             "Title can be maximum 20 characters long.",
//             500
//         );
//         return next(error);
//     }

//     try {
//         const sess = await mongoose.startSession();
//         sess.startTransaction();
//         await createdAbout.save({ sessiosn: sess });
//         await sess.commitTransaction();
//     } catch (err) {
//         const error = new HttpError(
//             "Creating special failed. Please try again.",
//             500
//         );
//         return next(error);
//     }

//     res.status(201).json({ special: createdAbout });
// };

const updateSpecial = async (req, res, next) => {
  const { title, description, specialBanner, specialBannerMobile } = req.body;
  const specialId = "5ea7c067f9fc0e25c52844f3";

  let special;

  if (
    (title && title.length > 30) ||
    (description && description.length > 1500)
  ) {
    const error = new HttpError(
      "Title and description can be maximum 30 and 1500 characters long, respectively.",
      500
    );
    return next(error);
  }

  //If you don't want to allow special banner not to be set uncomment code below.

  // if (
  //   (specialBanner && specialBanner.length <= 0)
  // ) {
  //   const error = new HttpError(
  //     "Image cannot be empty.",
  //     500
  //   );
  //   return next(error);
  // }

  try {
    special = await Special.findById(specialId).exec();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update special.",
      500
    );
    return next(error);
  }

  if (title) {
    special.title = title;
  }

  if (description) {
    special.description = description;
  }

  if (specialBanner) {
    special.specialBanner = specialBanner;
  }

  if (specialBannerMobile) {
    special.specialBannerMobile = specialBannerMobile;
  }

  try {
    special = await special.save();

  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update special.",
      500
    );
    return next(error);
  }

  res.status(200).json({ special: special.toObject({ getters: true }) });
};

// exports.createSpecial = createSpecial;

exports.getSpecial = getSpecial;
exports.updateSpecial = updateSpecial;
