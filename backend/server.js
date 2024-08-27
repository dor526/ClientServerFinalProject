const express = require("express");
require("dotenv").config();
//express application
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/user");

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(cookieParser());

app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listen on port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

