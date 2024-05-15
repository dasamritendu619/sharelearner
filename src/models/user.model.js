import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        index: "text",
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        loawercase: true,
        trim: true
    },
    username: {
        type: String,
        minLength: 4,
        unique: true,
        index: true,
        required: true,
        loawercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minLength: 8,
    },
    refreshToken: {
        type: String
    },
    dob: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ['F', 'M', 'O'],
        default: 'M'
    },
    avatar: {
        type: String
    },
    coverPhoto: {
        type: String
    },
    education: {
        type: String
    },
    about: {
        type: String
    },
    address: {
        type: String
    },
    links: [
        {
            type: String
        }
    ],
    interest: [
        {
            type: String
        }
    ],
}, {
    timestamps: true
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordMatch = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

userSchema.plugin(mongooseAggregatePaginate);
export const User = mongoose.Model('User', userSchema);
