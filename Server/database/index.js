//userName: kvenkateswarrao877
//password: rkAHFg7px11Uxono

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect(
    "mongodb+srv://kvenkateswarrao877:rkAHFg7px11Uxono@mern-stack.yfvmlmp.mongodb.net/"
  )
  .then(() => console.log("connected to mongoDB"))
  .catch((e) => console.log(e));
