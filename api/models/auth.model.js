import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^([0-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/.test(v);
            },
            message: props => `${props.value} is not a valid date of birth! Format should be dd/mm/yyyy`
        }
    },
    panNumber: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
