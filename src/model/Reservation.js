import mongoose from 'mongoose';
const { Schema } = mongoose;

const reservationSchema = new Schema({
  firstName: String,
  lastName: String,
  Email: String,
  CIN: String,
  ID_Rooms: { type: Schema.Types.ObjectId, ref: 'Room', required: false },
  Date_Debut: Date,
  Date_Fin: Date,
  Duree: Number,
  Prix: Number,
  Paid:{ type: String, required: false, default: 'Invalid' },
});

const Reservation = mongoose.model('Reservation', reservationSchema);
export default Reservation;