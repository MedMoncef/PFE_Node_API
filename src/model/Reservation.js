import mongoose from 'mongoose';
const { Schema } = mongoose;

const reservationSchema = new Schema({
  ID_Reservation: String,
  ID_Rooms: String,
  People: Number,
  Date_Debut: Date,
  Date_Fin: Date,
  Duree: Number,
});

const Reservation = mongoose.model('Reservation', reservationSchema);
export default Reservation;