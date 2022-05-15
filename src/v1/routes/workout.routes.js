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
 * components:
 *   parameters:
 *     idParam:
 *       in: path
 *       name: workoutId
 *       schema:
 *         type: string
 *       required: true
 *       description: The workout id
 *
 *   responses:
 *     404NotFound:
 *       description: No workout with given id
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: Failed
 *               data:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: "Can't find workout with the id '52'"
 *
 *     5XXError:
 *       description: FAILED
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: FAILED
 *               data:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: "Some error message"
 */

/**
 * @openapi
 * /api/v1/workouts:
 *     get:
 *       summary: Returns list of workouts
 *       tags: [Workout]
 *       responses:
 *         200:
 *           description: The list of workouts
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     example: OK
 *                   data:
 *                     type: array
 *                     $ref: "#/components/schemas/Workout"
 *         5XX:
 *           $ref: "#/components/responses/5XXError"
 *
 *     post:
 *       summary: Create a workout
 *       tags: [Workout]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Workout"
 *       responses:
 *         201:
 *           description: Create a workout
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     example: OK
 *                   data:
 *                     type: object
 *                     $ref: "#/components/schemas/Workout"
 *
 *         400:
 *           description: Workout already exists
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     example: FAILED
 *                   data:
 *                     properties:
 *                       error:
 *                         type: string
 *                         example: Workout with name 'Core buster' already exists
 *
 *         5XX:
 *           $ref: "#/components/responses/5XXError"
 */

router
  .route("/")
  .get(cache("2 minutes"), getAllWorkouts)
  .post(createNewWorkout);

/**
 *  @openapi
 *  /api/v1/workouts/{workoutId}:
 *    get:
 *      summary: Get workout by id
 *      tags: [Workout]
 *      parameters:
 *        - $ref: "#components/parameters/idParam"
 *      responses:
 *        200:
 *          description: The workout by id
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: OK
 *                  data:
 *                    type: object
 *                    $ref: "#/components/schemas/Workout"
 *
 *        404:
 *          $ref: "#/components/responses/404NotFound"
 *
 *        5XX:
 *          $ref: "#components/responses/5XXError"
 *
 *    patch:
 *      summary: Update workout by id
 *      tags: [Workout]
 *      parameters:
 *        - $ref: "#components/parameters/idParam"
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Workout"
 *      responses:
 *        200:
 *          description: Update Workout
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: OK
 *                  data:
 *                    type: object
 *                    $ref: "#/components/schemas/Workout"
 *
 *        404:
 *          $ref: "#/components/responses/404NotFound"
 *
 *        5XX:
 *          $ref: "#/components/responses/5XXError"
 *
 *    delete:
 *      summary: Delete workout by id
 *      tags: [Workout]
 *      parameters:
 *        - $ref: "#components/parameters/idParam"
 *      responses:
 *        200:
 *          description: Delete workout by id
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: OK
 *
 *        404:
 *          $ref: "#/components/responses/404NotFound"
 *
 *        5XX:
 *          $ref: "#/components/responses/5XXError"
 */

router
  .route("/:workoutId")
  .get(getOneWorkout)
  .patch(updateOneWorkout)
  .delete(deleteOneWorkout);

router.get("/:workoutId/records", getRecordForWorkout);

module.exports = router;
