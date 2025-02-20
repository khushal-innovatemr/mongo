const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    product: { type: String, required: true },
    manufacturer: { type: String, required: true },
    price: { type: Number, required: true },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;