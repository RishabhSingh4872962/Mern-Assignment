const jwt = require("jsonwebtoken");
const { userModel } = require("../dataBases/userDB");

module.exports = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).send({ success: false, msg: "Please login or register" });
  }

  try {
    const { id, email } = jwt.verify(token, process.env.JWTSECRET);
    const user = await userModel.findOne({ _id: id, email });

    if (user) {
      req.user = { id, email };
      next();
    } else {
      return res.status(401).send({ success: false, msg: "Unauthorized route" });
    }
  } catch (error) {
    // Handle the error by passing it to the error handling middleware
    next(error);
  }
};
