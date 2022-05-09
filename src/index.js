const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

const v1router = require("./v1/routes");

// app.get("/", (req, res) => {
//   res.send("<h2>Hello<h2>");
// });

app.use("/api/v1", v1router);

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
