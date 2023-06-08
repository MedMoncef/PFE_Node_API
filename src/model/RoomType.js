import mongoose from 'mongoose';

const { Schema } = mongoose;

const roomTypeSchema = new Schema({
  ID_RoomType: String,
  Name: String,
});

const RoomType = mongoose.model('RoomType', roomTypeSchema);
export default RoomType;