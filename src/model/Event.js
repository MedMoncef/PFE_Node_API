import mongoose from 'mongoose';

const { Schema } = mongoose;

const eventSchema = new Schema({
  ID_Event: String,
  Type: String,
  Time: Date,
  Duree: Number,
  Host: String,
  Desc: String,
});

const Event = mongoose.model('Event', eventSchema);

export default Event;