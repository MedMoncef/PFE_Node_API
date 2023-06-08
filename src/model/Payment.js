import mongoose from 'mongoose';
const { Schema } = mongoose;

const paymentSchema = new Schema({
  cardNumber: String,
  expiryDate: String,
  cvv: String,
  nameOnCard: String,
  amount: Number
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;