const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body

        const checkExistingUser = await User.findOne({ $or: [{ username }, { email }] })
        if (checkExistingUser) return res.status(400).json({
            success: false,
            message: 'Username or Email already exists'
        })

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const createUser = new User({
            username,
            email,
            password: hashedPassword,
            role
        });

        await createUser.save();

        if (createUser) {
            res.status(201).json({
                success: true,
                message: 'User registered successfully'
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Failed to register user'
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error'
        });
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // find if the user is exists in the database or not
        const user = await User.findOne({ username });

        if (!user) return res.status(400).json({
            success: false,
            message: 'User not found'
        });

        // check if the password is correct or not
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({
            success: false,
            message: 'Incorrect password'
        });

        // create user token
        const accessToken = jwt.sign({
            userId: user._id,
            username: user.username,
            role: user.role
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h'
        })

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            accessToken
        })


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error'
        });
    }
}

module.exports = {
    registerUser,
    loginUser,
    // other routes...
}