import mongoose from 'mongoose';
const { Schema } = mongoose;

const loginSchema = new Schema({
  loginTime: { type: Date, required: true },
  isLate: { type: Boolean, required: true },
});

const Login = mongoose.model('Login', loginSchema);
export default Login;