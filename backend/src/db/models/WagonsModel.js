import mongoose from 'mongoose';

export const WagonsModel = mongoose.model('wagons', {
    WagonNr: {
        type: String,
        required: true,
        unique: true,
    },

    WagonType: {
        type: String,
        required: true,
        enum: ['ERMEWA', 'MILLET'],
    },

    Volume: {
        type: Number,
        required: true,
    },

    UnloadingHeight: {
        type: Number,
    },

    EmptyBrakeWeight: {
        type: Number,
    },

    LoadBrakeWeight: {
        type: Number,
    },

    BrakedWeightChangeover: {
        type: Number,
    },

    BrakedWeightOfHandbrake: {
        type: Number,
    },

    PayloadC80: {
        type: Number,
        required: true,
    },

    PayloadC82: {
        type: Number,
    },

    PayloadD90: {
        type: Number,
    },

    LUP: {
        type: Number,
        required: true,
    },

    Tare: {
        type: Number,
        required: true,
    },

    BrakeMassClassC: {
        type: Number,
    },
});