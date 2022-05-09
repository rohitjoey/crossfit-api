const Workout = require("../database/Workout"); //thi corresponds to a database model

const { v4: uuid } = require("uuid");

class WorkoutService {
  getAllWorkouts = () => {
    const allworkouts = Workout.getAllWorkouts();
    return allworkouts;
  };

  getOneWorkout = (workoutId) => {
    const workout = Workout.getOneWorkout(workoutId);
    return workout;
  };

  createNewWorkout = (newWorkout) => {
    const workoutToCreate = {
      ...newWorkout,
      id: uuid(),
      createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };

    const createdWorkout = Workout.createNewWorkout(workoutToCreate);
    return createdWorkout;
  };

  updateOneWorkout = (workoutId, changes) => {
    const updatedWorkout = Workout.updateOneWorkout(workoutId, changes);
    return updatedWorkout;
  };

  deleteOneWorkout = (workoutId) => {
    Workout.deleteOneWorkout(workoutId);
    return;
  };
}

module.exports = WorkoutService;
