const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const { body } = require("express-validator");

const controller = require("../controllers/items.controller");

const rules = [
  body("name").escape().notEmpty().withMessage("El nombre es requerido"),
  body("price")
    .escape()
    .notEmpty()
    .withMessage("El Precio es requerido")
    .bail()
    .isNumeric()
    .withMessage("El precio tiene que ser un numero"),
  body("email")
    .escape()
    .isEmail()
    .withMessage("Por favor, introduzca un correo electrónico válido"),
  body("password")
    .escape()
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage("La contraseña debe tener ..."),
  body("image").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Requerida");
    }

    if (!req.file.mimetype.startsWith("image/")) {
      throw new Error("Type image/*");
    }

    if (req.file.size > 1 * 1024 * 1024) {
      throw new Error("Máximo 1Mb");
    }

    return true;
  }),
];

router.post("/", upload.single("image"), rules, controller.store);

module.exports = router;
