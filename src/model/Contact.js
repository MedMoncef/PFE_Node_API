import mongoose from 'mongoose';

const { Schema } = mongoose;

const contactSchema = new Schema({
  ID_Contact: String,
  Nom: String,
  Email: String,
  Sujet: String,
  Message: String
});

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;