import mongoose from 'mongoose';
const { Schema } = mongoose;

const messageSchema = new Schema({
  Message: String,
  ID_Sent: String,
  ID_SentTo: String,
  ID_PostSent: String
});

const Message = mongoose.model('Message', messageSchema);
export default Message;