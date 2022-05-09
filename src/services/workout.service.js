const Workout = require("../database/Workout"); //this corresponds to a database model

const { v4: uuid } = require("uuid");

class WorkoutService {
  getAllWorkouts = (filterParams) => {
    try {
      const allWorkouts = Workout.getAllWorkouts(filterParams);
      return allWorkouts;
    } catch (error) {
      throw error;
    }
  };

  getOneWorkout = (workoutId) => {
    try {
      const workout = Workout.getOneWorkout(workoutId);
      return workout;
    } catch (error) {
      throw error;
    }
  };

  createNewWorkout = (newWorkout) => {
    const workoutToInsert = {
      ...newWorkout,
      id: uuid(),
      createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    try {
      const createdWorkout = Workout.createNewWorkout(workoutToInsert);
      return createdWorkout;
    } catch (error) {
      throw error;
    }
  };

  updateOneWorkout = (workoutId, changes) => {
    try {
      const updatedWorkout = Workout.updateOneWorkout(workoutId, changes);
      return updatedWorkout;
    } catch (error) {
      throw error;
    }
  };

  deleteOneWorkout = (workoutId) => {
    try {
      Workout.deleteOneWorkout(workoutId);
    } catch (error) {
      throw error;
    }
  };
}

module.exports = WorkoutService;
