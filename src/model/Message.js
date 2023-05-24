import mongoose from 'mongoose';
const { Schema } = mongoose;

const messageSchema = new Schema({
  ID_Message: String,
  Sujet: String,
  Message: String,
  ID_Sent: String
});

const Message = mongoose.model('Message', messageSchema);
export default Message;