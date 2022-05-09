const Record = require("../database/Record");

class RecordService {
  getRecordForWorkout = (workoutId) => {
    try {
      const record = Record.getRecordForWorkout(workoutId);
      return record;
    } catch (error) {
      throw error;
    }
  };
}
module.exports = RecordService;
