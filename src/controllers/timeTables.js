const moment = require('moment');
const Login = require('../model/timeTable');

const loginCheck = async (req, res) => {
  try {
    // Get user ID from request body
    const { userId } = req.body;

    // Save login information
    const login = new Login({
      userId,
      loginTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      isLate: moment().isAfter(moment().set('hour', 9).set('minute', 0).set('second', 0)),
    });

    // Save the login entry
    await login.save();

    return res.status(200).json({ message: 'Login saved successfully' });
  } catch (error) {
    console.error('Error saving login:', error);
    return res.status(500).json({ error: 'Failed to save login entry' });
  }
};

export { loginCheck };