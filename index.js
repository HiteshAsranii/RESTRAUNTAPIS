const express = require("express");
const app = express();
const userRoute = require("./routes/UserRoute")
const menuRoute = require("./routes/MenuRoute")


// Middleware for parsing request bodies
app.use(express.json());


app.use("/user", userRoute);
app.use("/menu", menuRoute);


try {
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

} catch (error) {
  console.log(error);
}
