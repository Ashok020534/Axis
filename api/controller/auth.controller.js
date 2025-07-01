import User from '../models/auth.model.js';
import CustomError, { successResponse, errorResponse } from '../../utils/responce.js';
import { generateToken } from '../../middleware/auth.middleware.js';

export const registerUser = async (req, res) => {
    try {
        const { name, mobileNumber, dob, panNumber } = req.body;

        if (!name || !mobileNumber || !dob || !panNumber) {
            const err = new CustomError('All fields are required', 400);
            return errorResponse(res, err, 400, err.message);
        }

        const mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(mobileNumber)) {
            return errorResponse(res, {}, 400, 'Mobile number must be a 10-digit number');
        }

        const existingUser = await User.findOne({
            $or: [
                { mobileNumber },
                { panNumber }
            ]
        });

        if (existingUser) {
            return errorResponse(res, {}, 409, 'User already exists with this mobileNumber or PAN number');
        }

        const newUser = new User({
            name,
            mobileNumber,
            dob,
            panNumber
        });

        await newUser.save();
        const token = generateToken(newUser);

        return successResponse(res, {
            message: 'User registered successfully',
            userId: newUser._id,
            token,
        }, 201, 'Registration successful');
    } catch (err) {
        return errorResponse(res, err, 500, 'Registration failed');
    }
};

export const loginUser = async (req, res) => {
    try {
        const { mobileNumber, dob } = req.body;
        const user = await User.findOne({ mobileNumber, dob });

        if (!user) {
            return errorResponse(res, {}, 401, 'Invalid mobile number or DOB');
        }

        const token = generateToken(user);

        return successResponse(res, {
            message: 'Login successful',
            userId: user._id,
            token,
        }, 200, 'Login successful');
    } catch (err) {
        return errorResponse(res, err, 500, 'Login failed');
    }
};

export const getUserDetails = async (req, res) => {
    try {
        const { mobile } = req.params;
        const user = await User.findOne({ mobileNumber: mobile });

        if (!user) {
            return errorResponse(res, {}, 404, 'User not found');
        }

        const token = generateToken(user);

        return successResponse(res, {
            message: 'User details fetched',
            name: user.name,
            mobileNumber: user.mobileNumber,
            dob: user.dob,
            panNumber: user.panNumber,
            token,
        }, 200, 'User details fetched');
    } catch (err) {
        return errorResponse(res, err, 500, 'Failed to get user');
    }
};
