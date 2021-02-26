// var register = function (req, res) {
//   console.log('Registering User.');

//   var firstName = req.body.firstname;
//   var lastName = req.body.lastname;
//   var userName = req.body.username;
//   var password = req.body.password;

//   User.create(
//     {
//       firstName: firstName,
//       lastName: lastName,
//       userName: userName,
//       password: password,
//     },
//     function (err, user) {
//       if (err) {
//         console.log('Error creating User: ', err);
//         res.status(400).json(err);
//       } else {
//         console.log('User Created: ', user);
//         res.status(201).json(user);
//       }
//     },
//   );
// };
