const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const servicesRoutes = require('./routes/services-routes')
const usersRoutes = require('./routes/users-routes')
const aboutsRoutes = require('./routes/abouts-routes')
const specialsRoutes = require('./routes/specials-routes')
const testimonialsRoutes = require('./routes/testimonials-routes')
const contactRoutes = require('./routes/contact-routes')


const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
});
app.use('/api/services', servicesRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/about', aboutsRoutes)
app.use('/api/special', specialsRoutes)
app.use('/api/contact', contactRoutes);
app.use('/api/users', usersRoutes)

mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-zg3mk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    )
    .then(() => {
        app.listen(process.env.PORT || 5000);
    })
    .catch(err => {
        console.log(err);
    });