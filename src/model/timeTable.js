import mongoose from 'mongoose';
const { Schema } = mongoose;

const timeTableSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  loginTime: { type: Date, required: true },
  loginDate: { type: Date, required: true },
  isLate: { type: Boolean, required: true }
});

const TimeTable = mongoose.model('TimeTable', timeTableSchema);
export default TimeTable;