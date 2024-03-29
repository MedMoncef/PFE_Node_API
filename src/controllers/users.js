import User from '../model/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import z from 'zod';
import TimeTable from '../model/TimeTable';

const registerSchema = z.object({
  nom: z.string().nonempty('Nom is required'),
  prenom: z.string().nonempty('Prénom is required'),
  dateN: z.string().nonempty('Date of Birth is required'),
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters').nonempty('Password is required'),
  confirmPassword: z.string().nonempty('Confirm Password is required'),
  id_post: z.string().nonempty('Post is required'),
});
// ...

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).populate('id_post');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    console.error('Error getting user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createUser = async (req, res) => {
  try {
    const { nom, prenom, dateN, email, password, confirmPassword, image, id_post } = req.body;
    
    if (!password) {
      return res.status(400).send({ error: 'Password is required' });
    }  
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send({ error: 'User already exists' });
    }

    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).send({ error: 'Password and confirm password do not match' });
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);    

    const user = await User.create({
      nom,
      prenom,
      dateN,
      email,
      password: encryptedPassword,
      image,
      id_post
    });

    // Create JWT token
    const token = jwt.sign(
      { user_id: user._id, id_post },
      process.env.TOKEN_KEY,
      {
        expiresIn: "24h",
      }
    );

    // Send response
    res.send({
      email: user.email,
      nom: user.nom,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(400).send({ error: 'The user does not exist' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, userExists.password);
    if (!isPasswordValid) {
      return res.status(400).send({ error: 'Invalid password' });
    }

        // Determine if the user is late
        const loginTime = new Date();
        const loginDate = new Date(loginTime.getFullYear(), loginTime.getMonth(), loginTime.getDate());
        const isLate = loginTime.getHours() > 9; // This assumes that a user is late if they log in after 9:00.
    
        // Create a new TimeTable document
        await TimeTable.create({
          user: userExists._id,
          loginTime,
          loginDate,
          isLate
        });
    
        // If the user is late, increment their late count
        if (isLate) {
          userExists.late += 1;
          await userExists.save();
        }

    // Create JWT token payload
    const tokenPayload = {
      user_id: userExists._id,
      id_post: userExists.id_post
    };

    // Create JWT token
    const token = jwt.sign(tokenPayload, process.env.TOKEN_KEY, {
      expiresIn: '24h'
    });

    res.cookie('token', token, {
      httpOnly: true
    });

    // Send response
    res.send({
      email: userExists.email,
      nom: userExists.nom,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal server error' });
  }
};


/* const getAllUser = async (req, res) => {
  const users = await User.find();
  return res.render("pages/login/register", { users });
}; */

const getAllUser = async (req, res) => {
  const users = await User.find().populate('id_post');
  return res.send(users);
};


const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  try {
    // Check if the updatedUser object contains a password field
    if (updatedUser.password) {
      // Encrypt the password
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(updatedUser.password, salt);
  
      updatedUser.password = encryptedPassword;
    }

    const result = await User.updateOne({ _id: id }, {
      nom: updatedUser.nom,
      prenom: updatedUser.prenom,
      dateN: updatedUser.dateN,
      email: updatedUser.email,
      password: updatedUser.password,
      image: updatedUser.image,
      id_post: updatedUser.id_post
    });

    if (result.n === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getUsersByPostId = async (req, res) => {
  const { post_id } = req.params;

  try {
    const users = await User.find({ id_post: post_id });

    return res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await User.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { createUser, getAllUser, getUserById, updateUser, deleteUser, loginUser, getUsersByPostId };