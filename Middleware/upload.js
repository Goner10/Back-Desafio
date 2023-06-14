const multer = require("multer");
const mimetypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const upload = function (subfolder) {
  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "./public/uploads/" + subfolder);
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); //date is added to create a unique filename
      },
    }),
    limits: { filesize: "2000000" },
    fileFilter: (req, file, cb) => {
      if (mimetypes.includes(file.mimetype)) {
        return cb(null, true);
      } else {
        return cb("File format not accepted");
      }
    },
  });
};

const uploadUserImg = upload("users"); //passing subfolder as parameter
const uploadEventImg = upload("events");
const uploadCommentImg = upload("comments");


module.exports = { uploadUserImg, uploadEventImg, uploadCommentImg };