const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let customerSchema = new Schema({
    email: { type: String, required: true, unique: true },
    customerID: {type: String, required: true, unique:true},
})

module.exports = mongoose.model('Customer', customerSchema);


