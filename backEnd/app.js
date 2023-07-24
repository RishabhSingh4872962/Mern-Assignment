const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./middlewares/errorMiddleware');

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(morgan('dev'));

async function connectDb() {
  await mongoose.connect('mongodb://127.0.0.1:27017/users');
}
connectDb().catch((err) => {
  console.log(err);
});

const userAuthRoutes = require('./routes/userAuthRoutes');
app.use('/user/auth', userAuthRoutes);

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
