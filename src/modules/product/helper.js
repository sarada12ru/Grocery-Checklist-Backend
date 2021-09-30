const uuid = require( 'uuid' );
const multer = require('multer');

//Image Upload
let uniqueId = "";
let filename = "";

const imagePath = "./src/assets/uploads/";

let storage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, imagePath );

  },
  filename: function (req, file, cb) {

    uniqueId = uuid.v4();

    filename = uniqueId + "." + file.originalname.split(".")[ file.originalname.split(".").length - 1 ];

    req.udf = filename;

    cb(null, filename);

  }
});

const upload = multer({ storage: storage });

module.exports = {

  imagePath,
  upload

}