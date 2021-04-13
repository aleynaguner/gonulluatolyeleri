console.log("imageUploader module reading...");

const multer = require("multer");

const getImageStore = (storeName) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `../filestore/${storeName}/`);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
};

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const createImageUploader = (createImageLoaderContext) => {
  return multer({
    storage: getImageStore(createImageLoaderContext.storeName),
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
  });
};

module.exports = (function () {
  console.log("imageUploader module exported!");
  return { createImageUploader };
})();
