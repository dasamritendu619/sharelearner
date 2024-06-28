import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const groupSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    groupName: {
        type: String,
        required: true,
        index: "text",
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    groupIcon:{
        type: String,
        trim: true
    },
    groupBanner:{
        type: String,
        trim: true
    }
},
    {
        timestamps: true
});

groupSchema.plugin(mongooseAggregatePaginate);

export const Group = mongoose.model('Group', groupSchema);