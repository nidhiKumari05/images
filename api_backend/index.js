const express = require("express");
const dotenv = require("dotenv");
const indexRouter = require("./routes/route.js");
const app = express();
// const port = process.env.API_PORT || 9005;
const port = 9005;
const cors = require("cors");
dotenv.config();

app.use(express.json());
app.use(cors());
app.get("./", (req, resp) => {
  resp.send("<h1>Hey there the app started</h1>");
});
app.use("/imageUpload", indexRouter);
app.listen(port, () => {
  console.log("server is running at port   " + port);
});
