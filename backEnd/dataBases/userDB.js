const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "firstName should must be provide"],
    min: [3, "name should be greater than 3"],
    max: [8, "name should be less than 12"],
  },
  lastName: {
    type: String,
    required: [true, "lastName should must be provide"],
    min: [3, "name should be greater than 3"],
    max: [8, "name should be less than 12"],
  },
  email: {
    type: String,
    required: [true, "email should must be provide"],
    unique: [true, "email should be unqiue"],
  },
  phone: {
    type: Object,
    required: [true, "phone should must be provide"],
    countryCode:{
      type:String,
      required:[true,"country code must provided"]
    },
    number:{
      type:Number,
      required:[true,"phone should be unqiue"],
      unique: [true, "phone should be unqiue"],
      validate: {
        validator: function (num) {
          return num.toString().length>6;
        },
        message: `phone number length should be equal to 6`,
      }
    }
  },
  gender: {
    type: String,
    required: [true, "gender should must be provide"],
    enum: ["male", "female", "trans", "not to disclose"],
  },
  age: {
    type: Number,
    required: [true, "age should must be provide"],
    validate: {
      validator: function (age) {
        return age >= 10 && age <= 80;
      },
      message: `age should be greater than 10 and less than 80`,
    },
  },
  password: {
    type: String,
    required: [true, "password should must be provide"],
    min: [6, "password should be greater than 6"],
    max: [15, "password should be less than 18"],
  },
  address: {
    type: Object,
    required: [true, "address should must be provide"],
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    }
  },
});

const userModel = new mongoose.model("users", userSchema);

module.exports = { userModel };
