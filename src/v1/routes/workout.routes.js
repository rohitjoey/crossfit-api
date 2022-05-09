const express = require("express");

const router = express.Router();

const {
  createNewWorkout,
  deleteOneWorkout,
  getOneWorkout,
  updateOneWorkout,
  getAllWorkouts,
} = require("../../controllers/workout.controllers");

// router.route("/").get((req, res) => {
//   res.send(`<h1>Hello from ${req.baseUrl}<h1>`);
// });

router.route("/").get(getAllWorkouts).post(createNewWorkout);

router
  .route("/:id")
  .get(getOneWorkout)
  .patch(updateOneWorkout)
  .delete(deleteOneWorkout);

module.exports = router;
