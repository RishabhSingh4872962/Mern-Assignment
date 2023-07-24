const { body } = require("express-validator");

 module.exports= [
    body("email").trim().isEmail().notEmpty().isString(),
    body("firstName").isLength({ min: 3, max: 8 }).notEmpty().isString(),
    body("lastName").isLength({ min: 3, max: 8 }).notEmpty().isString(),
   
    body("phone")
      .notEmpty()
      .custom((obj) => {
        const { countryCode, number } = obj;
        if (!countryCode || !number) {
          return false;
        }
        return true;
      })
      .withMessage(`enter the valid number `),
    body("age")
      .notEmpty()
      .isNumeric()
      .custom((val) => {
        return val >= 10 && val <= 80;
      }),
    body("gender")
      .isString()
      .notEmpty()
      .custom((val) => {
        return ["male", "female", "trans", "not a disclose"].includes(val);
      }),
    body("address")
      .notEmpty()
      .custom((obj) => {
        const { street, city, pincode, country } = obj;
        if (!street || !city || !pincode || !country) {
          return false;
        }
        return true;
      })
      .withMessage(`enter the valid address fill all the fields`),
  ]

  