import express, { Router } from 'express';
import bcrypt from 'bcryptjs';
import url from 'url';
import userSchema from '../models/users';

import  checker  from '../auth'


const router = Router();
/* GET users details. */
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const errors = [];
  let passwordError = '';
  let fieldError = '';
  let emailError = '';
  if (!email || !password) {
    fieldError = 'Please fill in all fields';
    errors.push({ msg: fieldError });
  }
  if (errors.length > 0) {
    res.redirect(
      url.format({
        pathname: '/login-register',
        query: {
          fieldError,
          emailError,
          passwordError,
        },
      }),
    );
  } else {
    userSchema.findOne({ email: email }).then(async (user) => {
      if (!user) {
        emailError = 'no account found, nonsense!';
        res.redirect(
          url.format({
            pathname: '/login-register',
            query: {
              fieldError,
              emailError,
              passwordError,
            },
          }),
        );
      } else {
        console.log('mad ooo');
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          passwordError = 'password does not match';
          return res.redirect(
            url.format({
              pathname: '/login-register',
              query: {
                fieldError,
                emailError,
                passwordError,
              },
            }),
          );
        }
        req.session.user = { username: user.username, email: user.email };
        return res.redirect('/my-account');
      }
    });
  }
});
router.post('/reg', (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const errors = [];
  let passwordError: any;
  let fieldError: any;
  let emailError: any;
  if (!firstName || !lastName || !email || !password) {
    fieldError = 'Please fill in all fields';
    errors.push({ msg: fieldError });
  }
  if (errors.length > 0) {
    res.render('login-register', {
      fieldError,
      passwordError,
      emailError,
      firstName,
      lastName,
      email,
      password,
    });
  } else {
    userSchema.findOne({ email: email }).then((user) => {
      if (user) {
        emailError = 'email is already registered';
        res.render('login-register', {
          fieldError,
          passwordError,
          emailError,
          firstName,
          lastName,
          email,
          password,
        });
      } else {
        const newUser = new userSchema({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
        });
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((result) => {
                res.redirect('/login-register');
              })
              .catch((err) => {
                if (err) res.send('error');
              });
          }),
        );
      }
    });
  }
});
export default router;
