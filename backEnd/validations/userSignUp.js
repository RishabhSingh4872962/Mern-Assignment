const { body } = require("express-validator");

module.exports = [
  body("email").trim().isEmail().notEmpty().isString(),
  body("firstName").isLength({ min: 3, max: 8 }).notEmpty().isString(),
  body("lastName").isLength({ min: 3, max: 8 }).notEmpty().isString(),
  body("phone")
    .notEmpty()
    .isString()
    .exists()
    .withMessage("Please provide a valid phone number")
    .custom((value) => {
      const { countryCode, number } = JSON.parse(value);
      return countryCode && number;
    })
    .withMessage("Please provide a valid phone number"),
  body("age").notEmpty().isInt({ min: 10, max: 80 }).withMessage("Age should be between 10 and 80"),
  body("gender")
    .isString()
    .notEmpty()
    .isIn(["male", "female", "trans", "not a disclose"])
    .withMessage("Invalid gender value"),
  body("address")
    .notEmpty()
    .isString()
    .exists()
    .withMessage("Please provide a valid address")
    .custom((value) => {
      const { street, city, pincode, country } = JSON.parse(value);
      return street && city && pincode && country;
    })
    .withMessage("Please provide a valid address with all fields filled"),
];
