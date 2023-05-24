import mongoose from 'mongoose';

const { Schema } = mongoose;

const roomSchema = new Schema({
  ID_Rooms: String,
  Room_Number: String,
  Floor_Number: String,
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
    this.Price = 100;
    this.Size = '300 square feet';
    this.Bed_Number = '1 Bed';
    this.Max = 2;
  } else if (this.Type === 'Deluxe Room') {
    this.Price = 200;
    this.Size = '400 square feet';
    this.Bed_Number = '2 Beds';
    this.Max = 3;
  } else if (this.Type === 'Suite') {
    this.Price = 300;
    this.Size = '600 square feet';
    this.Bed_Number = '4 Beds';
    this.Max = 6;
  } else if (this.Type === 'Executive Room') {
    this.Price = 200;
    this.Size = '400 square feet';
    this.Bed_Number = '2 Beds';
    this.Max = 4;
  } else if (this.Type === 'Family Room') {
    this.Price = 200;
    this.Size = '500 square feet';
    this.Bed_Number = '4 Beds';
    this.Max = 7;
  } else if (this.Type === 'Specialty Rooms') {
    this.Price = 300;
    this.Size = '500 square feet';
    this.Bed_Number = '4 Beds';
    this.Max = 6;
  }

  next();
});

const Room = mongoose.model('Room', roomSchema);
export default Room;