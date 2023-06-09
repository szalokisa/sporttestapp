import mongoose from 'mongoose';

export const WagonsetsModel = mongoose.model('wagonsets', {
    WagonsetNr: {
        type: String,
        required: true,
        unique: true,
    },
})