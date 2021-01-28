const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const About = require("../models/about");

const getAbout = async (req, res, next) => {
  let about;

  try {
    about = await About.find();
  } catch (err) {
    const error = new HttpError(
      "Fetching about failed. Please, try again later.",
      500
    );
    return next(error);
  }

  if (!about || about.length === 0) {
    return next(new HttpError("Could not find about.", 404));
  }
  res.json({ about });
};

//
/*  

***** THIS CODE SHOULD ONLY BE ADDED TO FIRST CREATE AN ABOUT, AS THERE IS ONLY A SINGLE ABOUT ON THE PROJECT.
***** ALL THAT CAN BE DONE AFTERWARDS IS TO EDIT IT
***** IF YOU EVER NEED TO CREATE A NEW ABOUT, JUST UNCOMMENT THE BELLOW CODE AND CREATE A POST REQUEST TARGETING '/'
***** COMMENT CODE BACK AFT FOR SECURITY REASONS.
***** MAKE SURE TO HAVE ONLY A SINGLE ENTRY IN YOUR DB FOR AN ABOUT!
***** DON'T FORGET TO UPDATE ABOUT ID ON THE UPDATE ABOUT SECTION, AS THE ID IS HARDCODED
***** THANK YOU!

*/
//
//
// const createAbout = async (req, res, next) => {

//     const { title, description, image } = req.body;

//     const createdAbout = new About({
//         title,
//         description,
//         image
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
//             "Creating about failed. Please try again.",
//             500
//         );
//         return next(error);
//     }

//     res.status(201).json({ about: createdAbout });
// };

const updateAbout = async (req, res, next) => {
  const { title, description, image } = req.body;
  const aboutId = "5ea7b15415b7bb2ff31f883b";

  let about;

  if (
    (title && title.length > 25) ||
    (description && description.length > 1000)
  ) {
    const error = new HttpError(
      "Title and description can be maximum 25 and 1000 characters long, respectively.",
      500
    );
    return next(error);
  }

  try {
    about = await About.findById(aboutId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update about.",
      500
    );
    return next(error);
  }

  if (title) {
    about.title = title;
  }
  if (description) {
    about.description = description;
  }
  if (image) {
    about.image = image;
  }

  try {
    about = await about.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update about.",
      500
    );
    return next(error);
  }

  res.status(200).json({ about: about.toObject({ getters: true }) });
};

// exports.createAbout = createAbout;

exports.getAbout = getAbout;
exports.updateAbout = updateAbout;
