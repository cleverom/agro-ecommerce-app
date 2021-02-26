import express, { Router } from 'express';
import contactSchema from '../models/contact';

const router = Router();

//GET customer complaints
router.post('/contact', (req, res) => {
  const latestContact = new contactSchema({
    fullName: req.body.fullName,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
  });

  console.log(latestContact);
  latestContact
    .save()
    .then((result) => {
      res.status(201).json();
    })
    .catch((err) => {
      if (err) res.send(err);
    });
});

export default router;
