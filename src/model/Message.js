import mongoose from 'mongoose';
const { Schema } = mongoose;

const messageSchema = new Schema({
  Message: String,
  ID_Sent: String,
  ID_SentTo: String,
  ID_PostSent: String,
  View: { type: Boolean, default: false, required: false },
});

const Message = mongoose.model('Message', messageSchema);
export default Message;