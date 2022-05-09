const express = require("express");

const router = express.Router();

const apicache = require("apicache");

const cache = apicache.middleware;

const {
  createNewWorkout,
  deleteOneWorkout,
  getOneWorkout,
  updateOneWorkout,
  getAllWorkouts,
} = require("../../controllers/workout.controllers");
const { getRecordForWorkout } = require("../../controllers/record.controller");

// router.route("/").get((req, res) => {
//   res.send(`<h1>Hello from ${req.baseUrl}<h1>`);
// });

/**
 * @openapi
 * /api/v1/workouts:
 *   get:
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: query
 *         name: mode
 *         schema:
 *           type: string
 *         description: The mode of a workout
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Workout"
 *
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 *   post:
 *
 */

router
  .route("/")
  .get(cache("2 minutes"), getAllWorkouts)
  .post(createNewWorkout);

router
  .route("/:workoutId")
  .get(getOneWorkout)
  .patch(updateOneWorkout)
  .delete(deleteOneWorkout);

router.get("/:workoutId/records", getRecordForWorkout);

module.exports = router;
