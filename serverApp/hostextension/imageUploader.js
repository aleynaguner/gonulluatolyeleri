console.log("imageUploader module reading...");

const multer = require("multer");
const ObjectID = require("mongodb").ObjectID;
const path = require("path");
const config = require("../config");

const getImageStore = (storeName) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(config.fileStorePath, storeName));
    },
    filename: function (req, file, cb) {
      // TO-DO: Eğer update işlemi yapılıyorsa client tan id geliyor
      // yinede bu yapı sağlıklı değil imageUploader request body e doc id yi yazmamalı
      // bu middleware in önüne saveContextCreator gibi bi middleware eklemek gerek ve orda id oluşturulmalı
      let imageId =
        req.params.id.trim() !== undefined && req.params.id.trim() !== 0
          ? req.params.id.trim()
          : new ObjectID().toHexString();
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
