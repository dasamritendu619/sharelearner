import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const groupSettingsSchema = new mongoose.Schema({
    group:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    onlyAdminCanSendMessage: {
        type: Boolean,
        default: false
    },
    onlyAdminCanEditGroupSettings: {
        type: Boolean,
        default: false
    },

});
groupSettingsSchema.plugin(mongooseAggregatePaginate);
export const GroupSettings = mongoose.model('GroupSettings', groupSettingsSchema);