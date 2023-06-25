import mongoose from 'mongoose';

const { Schema } = mongoose;

const contactSchema = new Schema({
  Nom: String,
  Email: String,
  Sujet: String,
  Message: String
});

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;