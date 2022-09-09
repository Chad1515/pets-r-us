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
 
//render HTML w/ EJS
app.engine('html', require('ejs').__express);

//set views folder as path for HTML files
app.set('views', path.join(__dirname, 'views'));
app.set('views', './views');
app.set('view engine', 'html');
 
//set public folder as path for static files
app.use(express.static(path.join(__dirname, 'public')));

//app listen on port 3000
const PORT = process.env.PORT || 3000;

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

//port declared & message to console that the app has started
app.listen(PORT, () => {
    console.log('The App has started and listens on port ' + PORT);
});