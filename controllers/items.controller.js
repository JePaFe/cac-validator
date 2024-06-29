const { validationResult } = require("express-validator");

const path = require("path");
const sharp = require("sharp");

const store = (req, res) => {
  const result = validationResult(req);

  // console.log(result);

  if (!result.isEmpty()) {
    return res.status(422).json({ errors: result.array() });
  }

  // console.log(req.file);
  if (req.file) {
    sharp(req.file.buffer)
      .resize(300)
      .toFile(
        path.resolve(__dirname, "../public/uploads", req.file.originalname)
      );
  }

  res.status(201).json(req.body);
};

module.exports = {
  store,
};
