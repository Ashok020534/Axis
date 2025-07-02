import StoreSms from '../models/storeSms.model.js';
import User from '../models/auth.model.js';
import CustomError, { multiMessageResponse, errorResponse } from '../../utils/responce.js';
import { generateToken } from '../../middleware/auth.middleware.js';


export const storeSms = async (req, res) => {
    try {
        const userMobile = req.user?.mobileNumber;
        const { messages } = req.body;

        if (!userMobile) {
            return errorResponse(res, {}, 400, 'User mobile number not found');
        }

        if (!Array.isArray(messages) || messages.length === 0) {
            return errorResponse(res, {}, 400, 'Messages array is required');
        }

        const user = await User.findOne({ mobileNumber: userMobile });
        if (!user) {
            return errorResponse(res, {}, 404, 'User not found');
        }

        const userId = user._id;

        await StoreSms.deleteMany({ user: userId });

        const smsDocs = messages.slice(0, 10).map(msg => ({
            title: msg.title,
            body: msg.body,
            user: userId,
        }));

        const inserted = await StoreSms.insertMany(smsDocs);

        const token = generateToken(user);

        return multiMessageResponse(
            res,
            [{ title: 'Messages stored successfully', body: 'Your messages have been saved.' }],
            201,
            {
                count: inserted.length,
                token
            }
        );
    } catch (err) {
        return errorResponse(res, err, 500, 'Failed to store messages');
    }
};
