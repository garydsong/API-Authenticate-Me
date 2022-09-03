const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();
// backend/app.js
const routes = require('./routes');

// ...


app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

// Set the _csrf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

app.use(routes); // Connect all the routes
// backend/app.js
// ...

// backend/app.js
// ...
// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});

// backend/app.js
// ...
const { ValidationError } = require('sequelize');
const e = require('express');

// ...

// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    // err.errors = err.errors.map((e) => e.message);
    // err.title = 'Validation error';
    let eObj = {}
    if (err.errors.length){
      err.errors.forEach(e => {
        switch (e.message) {
          case 'usernameVal':
            err.message = "User already exists",
            eObj[e.path] = "User with that username already exists",
            err.status = 403;
            break;

          case 'emailVal':
            err.message = "User already exists",
            eObj[e.path] = "User with that email already exists",
            err.status = 403;
            break;
        }
      });

      err.errors = eObj;
    }
  }
  next(err);
});

// backend/app.js
// ...
// Error formatter
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
      // title: err.title || 'Server Error',
      message: err.message,
      statusCode: err.status,
      errors: err.errors
      // stack: isProduction ? null : err.stack
    });
  });

module.exports = app;
