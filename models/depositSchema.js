const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema({
    blockNumber: {
        type: Number,
        required: true
    },
    blockTimestamp: {
        type: Number,
        required: true
    },
    fee: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    pubkey: {
        type: String,
        required: true
    }
});

const Deposit= mongoose.model('Deposit', depositSchema);
module.exports = Deposit

