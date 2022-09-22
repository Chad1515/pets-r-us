<<<<<<< HEAD
/**
==============================================
; Title: Assignment 4.2 pets-r-us
; Author: Professor Krasso
; Modified by: Chad ONeal
; Date: 09/22/2022
; Description: index.js for pets-r-us
==============================================
*/

// requiring mongoose to connect to MongoDB
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creation of data to be held in mongo from registration form
let customerSchema = new Schema({
    email: { type: String, required: true, unique: true },
    customerID: {type: String, required: true, unique:true},
})

//exports data from app into the mongoDB database
module.exports = mongoose.model('Customer', customerSchema);


=======
/**
==============================================
; Title: Assignment 4.2 pets-r-us
; Author: Professor Krasso
; Modified by: Chad ONeal
; Date: 09/22/2022
; Description: index.js for pets-r-us
==============================================
*/

// requiring mongoose to connect to MongoDB
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creation of data to be held in mongo from registration form
let customerSchema = new Schema({
    email: { type: String, required: true, unique: true },
    customerID: {type: String, required: true, unique:true},
})

//exports data from app into the mongoDB database
module.exports = mongoose.model('Customer', customerSchema);


>>>>>>> 00fe55eac611a019fbafb30173be3cd4ae5f0eb4
