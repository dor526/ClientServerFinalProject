const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const stocksRoutes = require("./routes/stockes");
const userRoutes = require("./routes/user");

const cors = require("cors");

//express application instantiation
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/stocks", stocksRoutes);
app.use("/user", userRoutes);

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
