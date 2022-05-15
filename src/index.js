const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const v1WorkoutRouter = require("./v1/routes/workout.routes");
const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");

// app.get("/", (req, res) => {
//   res.send("<h2>Hello<h2>");
// });

app.use("/api/v1/workouts", v1WorkoutRouter);

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
  V1SwaggerDocs(app, PORT);
});
