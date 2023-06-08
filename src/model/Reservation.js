import mongoose from 'mongoose';
const { Schema } = mongoose;

const reservationSchema = new Schema({
  firstName: String,
  lastName: String,
  Email: String,
  CIN: String,
  ID_Rooms: String,
  Date_Debut: Date,
  Date_Fin: Date,
  Duree: Number,
});

// Define pre-save hook
reservationSchema.pre('save', function (next) {
  const reservation = this;
  
  // Calculate duration in milliseconds
  const durationMs = reservation.Date_Fin - reservation.Date_Debut;
  
  // Calculate days and hours from the duration
  const days = Math.floor(durationMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((durationMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  // Assign the duration values to the Duree field
  reservation.Duree = days;
  
  next();
});

const Reservation = mongoose.model('Reservation', reservationSchema);
export default Reservation;