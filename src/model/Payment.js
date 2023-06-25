import mongoose from 'mongoose';
const { Schema } = mongoose;

const paymentSchema = new Schema({
  cardNumber: Number,
  expiryDate: Date,
  cvv: String,
  nameOnCard: String,
  amount: Number
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;