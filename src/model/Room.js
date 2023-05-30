import mongoose from 'mongoose';

const { Schema } = mongoose;

const roomSchema = new Schema({
  ID_Rooms: String,
  Room_Number: String,
  Floor_Number: String,
  Name: String,
  Image: String,
  Description: String,
  Max: Number,
  View: String,
  Size: String,
  Bed_Number: String,
  Type: {
    type: String,
    enum: ['Standard Room', 'Deluxe Room', 'Suite', 'Executive Room', 'Family Room', 'Specialty Rooms']
  },
  Rating: Number,
  Price: Number,
});

roomSchema.pre('save', function (next) {
  if (this.Type === 'Standard Room') {
    this.Size = '300-500 square feet';
    this.Bed_Number = '1-2 Beds';
    this.Max = 2;
  } else if (this.Type === 'Deluxe Room') {
    this.Size = '400-600 square feet';
    this.Bed_Number = '2-4 Beds';
    this.Max = 3;
  } else if (this.Type === 'Suite') {
    this.Size = '500-700 square feet';
    this.Bed_Number = '3-5 Beds';
    this.Max = 6;
  } else if (this.Type === 'Executive Room') {
    this.Size = '400-600 square feet';
    this.Bed_Number = '2-4 Beds';
    this.Max = 4;
  } else if (this.Type === 'Family Room') {
    this.Size = '500-700 square feet';
    this.Bed_Number = '3-5 Beds';
    this.Max = 7;
  } else if (this.Type === 'Specialty Rooms') {
    this.Size = '500-700 square feet';
    this.Bed_Number = '3-5 Beds';
    this.Max = 6;
  }

  next();
});

const Room = mongoose.model('Room', roomSchema);
export default Room;