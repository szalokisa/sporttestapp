import mongoose from 'mongoose';

export const TrainsModel = mongoose.model('trains', {
    TrainNum: {
        type: String,
        required: true,
        unique: true,
    },

    PONum: {
        type: String,
    },

    Wagonset: {
        type: String,
        required: true,
    },

    LoadingPlace: {
        type: String,
        required: true,
    },

    LoadingETA: {
        type: Date,
        required: true,
    },

    LoadingETD: {
        type: Date,
        required: true,
    },

    UnloadingPlace: {
        type: String,
        required: true,
    },

    UnloadingETA: {
        type: Date,
        required: true,
    },

    UnloadingETD: {
        type: Date,
        required: true,
    },

    State: {
        type: String,
        required: true,
    },
});
