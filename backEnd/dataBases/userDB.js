const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name must be provided"],
    minlength: [3, "First name should be at least 3 characters long"],
    maxlength: [8, "First name should be less than 8 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Last name must be provided"],
    minlength: [3, "Last name should be at least 3 characters long"],
    maxlength: [8, "Last name should be less than 8 characters"],
  },
  email: {
    type: String,
    required: [true, "Email must be provided"],
    unique: [true, "Email must be unique"],
    validate: {
      validator: function (email) {
        // You can use a regular expression or a library like 'validator' to validate email format
        // Example using 'validator': return validator.isEmail(email);
        // Replace the following line with the actual validation code.
        return /\S+@\S+\.\S+/.test(email);
      },
      message: "Invalid email format",
    },
  },
  phone: {
    type: {
      countryCode: {
        type: String,
        required: [true, "Country code must be provided"],
      },
      number: {
        type: Number,
        required: [true, "Phone number must be provided"],
        unique: [true, "Phone number must be unique"],
        validate: {
          validator: function (num) {
            return num.toString().length > 6;
          },
          message: "Phone number length should be greater than 6",
        },
      },
    },
    required: [true, "Phone must be provided"],
  },
  gender: {
    type: String,
    required: [true, "Gender must be provided"],
    enum: ["male", "female", "trans", "not to disclose"],
  },
  age: {
    type: Number,
    required: [true, "Age must be provided"],
    validate: {
      validator: function (age) {
        return age >= 10 && age <= 80;
      },
      message: "Age should be between 10 and 80",
    },
  },
  password: {
    type: String,
    required: [true, "Password must be provided"],
    minlength: [6, "Password should be at least 6 characters long"],
    maxlength: [15, "Password should be less than 15 characters"],
  },
  address: {
    type: {
      street: { type: String, required: [true, "Street must be provided"] },
      city: { type: String, required: [true, "City must be provided"] },
      pincode: { type: String, required: [true, "Pincode must be provided"] },
      country: { type: String, required: [true, "Country must be provided"] },
    },
    required: [true, "Address must be provided"],
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = { userModel };
