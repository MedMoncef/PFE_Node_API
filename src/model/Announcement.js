import mongoose from 'mongoose';
const { Schema } = mongoose;

const announcementSchema = new Schema({
  Message: String,
  ID_Sent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  ID_SentTo: { type: String, required: false, default: 'All' },
  Date_Uploaded: { type: Date, default: Date.now },
});

const Announcement = mongoose.model('Announcement', announcementSchema);
export default Announcement;