
const jwt=require("jsonwebtoken")

module.exports=(data)=>{
    return  jwt.sign(data,process.env.JWTSECRET)
}