import mongoose from 'mongoose';
const { Schema } = mongoose;

const announcementSchema = new Schema({
  Message: String,
  ID_Sent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
});

const Announcement = mongoose.model('Announcement', announcementSchema);
export default Announcement;