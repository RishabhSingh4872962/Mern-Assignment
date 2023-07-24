const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser=require("cookie-parser")
app.use(express.json());
app.use(cookieParser())

const morgan=require("morgan")

const cors=require("cors")
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(morgan('dev'))



const errorHandler=require("./middlewares/errorMiddleware")


async function connectDb() {
  await mongoose.connect("mongodb://127.0.0.1:27017/users");
}
connectDb().catch((err) => {
  console.log(err);
});

const userAuthRoutes = require("./routes/userAuthRoutes");

app.use("/user/auth", userAuthRoutes);
// app.use(errorHandler)
app.listen(process.env.PORT, () => {
  console.log(`server running at port ${process.env.PORT}`);
});
