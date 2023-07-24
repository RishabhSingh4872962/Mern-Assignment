const jwt = require("jsonwebtoken");
const { userModel } = require("../dataBases/userDB");
module.exports = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(404).send({ success: false, msg: "please login or register" });
  }
  const {id,email} = jwt.verify(token, process.env.JWTSECRET);

 const user=await userModel.findOne({_id:id,email})
  if (id && email  &&user) {
    req.user =  {id,email};
    next();
  } else {
    return res.status(401).send({ success: false, msg: "unauthorised route" });
  }
};
