const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const http = require("http").createServer(app);
const cors = require("cors");

const userRouter = require("./user/user.router");
const userinfoRouter = require("./userinfo/userinfo.router");

const authRouter = require("./auth/auth.router");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require("dotenv").config();

const mongoDB_url = process.env.MONGODB_URL;
mongoose
  .connect(mongoDB_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

http.listen(4000 || process.env.PORT, function () {
  console.log("listening on port 4000");
});

app.use("/", authRouter);
app.use("/userinfo", userinfoRouter);

app.use("/user", userRouter);


