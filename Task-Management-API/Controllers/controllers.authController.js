import User from '../Models/models.User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// register controller 
export const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.json({ message: 'User registered successfully!' });
};


// login controller
export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Invalid credentials!' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, 'soumya', { expiresIn: '1h' });
    res.cookie('token', token)
    res.json({ message: 'Login successful' }, { token });
};
