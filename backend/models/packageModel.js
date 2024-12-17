
const mongoose = require('mongoose');

const packageSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    availableDates: [String],
    image: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);
