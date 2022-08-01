const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : String,
    isCompleted : Boolean,
});

module.exports = mongoose.model('User', userSchema);