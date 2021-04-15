console.log("imageUploader module reading...");

const multer = require("multer");
const ObjectID = require("mongodb").ObjectID;

const getImageStore = (storeName) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `../filestore/${storeName}/`);
    },
    filename: function (req, file, cb) {
      let imageId = new ObjectID().toHexString();
      let imageFormat = getImageFormat(file);
      let imageFullName = `${imageId}.${imageFormat}`;

      cb(null, imageFullName);

      req.body.imageInfo = {
        id: imageId,
        fileName: imageFullName,
      };
    },
  });
};

const getImageFormat = (imgFile) => {
  return imgFile.mimetype.split("/")[1];
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
      fileSize: 1024 * 1024 * 10,
    },
    fileFilter: fileFilter,
  });
};

module.exports = (function () {
  console.log("imageUploader module exported!");
  return { createImageUploader };
})();
