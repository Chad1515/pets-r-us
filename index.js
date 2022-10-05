/**
==============================================
; Title: Assignment 4.2 pets-r-us
; Author: Chad ONeal
; Date: 09/09/2022
; Resource: Resource: https://www.youtube.com/watch?v=lYVKbAn5Od0
; Description: index.js for pets-r-us
==============================================
*/

//requiring express & ejs
const express = require('express');
const ejs = require('ejs');
const app = express();
const path = require('path');

const mongoose = require('mongoose');
const fs = require('fs');

const Customer = require('./models/customer');
const Appointment = require('./models/appointments');
 
//render HTML w/ EJS
app.engine('html', require('ejs').__express);

//set views folder as path for HTML files
app.set('views', path.join(__dirname, 'views'));
app.set('views', './views');
app.set('view engine', 'html');

 
//set public folder as path for static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

//app listen on port 3000
const PORT = process.env.PORT || 3000;

//connection to mongodb
const conn = 'mongodb+srv://web340_admin:Neyland$15@bellevueuniversity.ox0t9kr.mongodb.net/web340DB';

mongoose.connect(conn).then(() => {
    console.log('Connection to the database was successful');
}).catch(err => {
    console.log('MongoDB Error: ' + err.message);
})

//sends landing/home page
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
    })
});

//sends grooming page
app.get('/grooming', (req, res) => {
    res.render('grooming', {
        title: 'Grooming',
    })
});

//sends boarding page
app.get('/boarding', (req, res) => {
    res.render('boarding', {
        title: 'Boarding',
    })
});

//sends training page
app.get('/training', (req, res) => {
    res.render('training', {
        title: 'Training',
    })
});

//sends registration page
app.get('/registration', (req, res) => {
    res.render('registration', {
        title: 'Registration',
    })
});

// post customer info to database
app.post('/customer', (req, res, next) => {
	// console.log the sent data
	console.log(req.body);
	console.log(req.body.customerID);
	console.log(req.body.email);

// creates new customer object
	const newCustomer = new Customer({
		customerID: req.body.customerID,
		email: req.body.email,
});

console.log(newCustomer);

// Save the new customer to the database
	Customer.create(newCustomer, (err, customer) => {
		// If there is an error, log it
		if (err) {
			console.log(err);
			next(err);
        // If there is no error, log the customer and redirect to the home page
		} else {
			console.log(`New Customer: ${customer} has been added to the database`);
                res.render('index', {
                    title: 'Home',
                })
		}
	});
});

// gets info from mongo and displays in customer list page
app.get('/customer', (req, res) => {
    Customer.find({}, function(err, customers)  {
        if (err) {
            console.log(err);
            next(err);
        } else {
            res.render('customer', {
                title: 'Customer List',
                customers: customers
            })
        }
    })
})

// sends booking page
app.get('/booking', (req, res) => {
	let jsonFile = fs.readFileSync('./public/data/services.json');
	let services = JSON.parse(jsonFile);

	console.log(services);

	res.render('booking', {
		title: 'Booking',
		services: services,
	})
});

//posts customer appointment information to mongo DB
app.post('/appointments', (req, res, next) => {
	const newAppointment = new Appointment({
		userName: req.body.userName,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		service: req.body.service,
	})

	//creates customer appointment and takes back to home page
	Appointment.create(newAppointment, function(err, order) {
		if (err) {
			console.log(err);
			next(err);
		} else {
			res.render('index', {
				title: 'Home',
			})
		}
	})
})


//sends my-appointment page
app.get('/my-appointments', (req, res) => {
    res.render('my-appointments', {
        title: 'My Appointments',
    })
})

//gets info from mongo DB and displays in table on my-appointments page
app.get('/api/appointments/:email', async(req, res, next) => {
    Appointment.find({'email': req.params.email}, function(err, appointments) {
        if (err) {
            console.log(err);
            next(err);
        } else {
            res.json(appointments);
        }
    })
})


//port declared & message to console that the app has started
app.listen(PORT, () => {
    console.log('The App has started and listens on port ' + PORT);
});