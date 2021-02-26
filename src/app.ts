import createError from 'http-errors';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';

import indexRouter from './routes/index';
import usersRouter from './routes/products';
import adminRouter from './routes/adminProd';
import connectDb from './config/dbconnect';
import regRouter from './controller/login-reg';
import loginRouter from './controller/login-reg';
import contactRouter from './controller/contact';
import checker from './auth';

// LOAD Configure

dotenv.config({ path: '/config/config.env' });

connectDb();

const app = express();
// const LocalStrategy = import('passport-local').Strategy;

app.use(cors());

// view engine setup

app.set('views', path.join(__dirname, '../', 'views'));

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../', 'public')));

// app.use()

app.use(
  session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  }),
);

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
});

app.use('/', indexRouter);
//app.use('/cart', indexRouter);

app.use('/products', usersRouter);
app.use('/adminProd', adminRouter);

app.use('/', regRouter);

app.use('/', loginRouter);

app.use('/', contactRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (
  err: createError.HttpError,
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
