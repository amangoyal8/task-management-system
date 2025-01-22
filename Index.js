const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
dotenv.config();
const app = express();
app.use(express.json());
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");
//Cors Origin
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);
app.options("*", cors());
// app.use('/', async (req, res) => {
//   res.status(200).send("Running Server")
// })
// app.use('/api', ruote);
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
mongoose
  .connect("mongodb://localhost:27017/taskmanager", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
app.listen(process.env.PORT, process.env.HOSTNAME, () => {
  console.log(
    `Server running at http://${process.env.HOSTNAME}:${process.env.PORT}`
  );
});