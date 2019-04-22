const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");


var User = require('../../../models/user.js');
module.exports = function (router) {

  router.get('/register', function (req, res) {
    res.json('Register Page');
  });


  router.post('/register', function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    // req.checkBody('name', 'Name is required').notEmpty();
    // req.checkBody('email', 'Email is required').notEmpty();
    // req.checkBody('email', 'Email is not valid').isEmail();
    // req.checkBody('username', 'Username is required').notEmpty();
    // req.checkBody('password', 'Password is required').notEmpty();
    // req.checkBody('password2', 'Passwords do not match').equals(password);

    // let errors = req.validationErrors();

    // if (errors) {
    //   // res.render('register', {
    //   //     errors: errors
    //   // });
    //   return res.status(401).json({
    //     success: false,
    //     errors: errors
    //   });
    // } else {
    let newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password
    });

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(newUser.password, salt, function (err, hash) {
        if (err) {
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function (err) {
          if (err) {
            // console.log(err);
            // return;
            return res.json({
              success: false,
              message: "Email or username already exists",
            });
          } else {

            // sendEmail(newUser); // Nodemailer Function | Welcome Email

            return res.status(200).json({
              success: true,
              message: "Registration successful",
            });
          }
        });
      });
    });
    // }
  }
  );

  router.get('/login', function (req, res) {
    res.json('Login Page');
  });

  router.post('/login', function (req, res, next) {
    User.findOne({ email: req.body.email })
      .exec()
      .then(function (user) {
        // Checking if the username is exists
        if (!user) {
          // req.flash('danger', 'Authentication failed');
          // return res.redirect('/login');
          return res.json({
            success: false,
            message: "User not found!"
          });
        }
        bcrypt.compare(req.body.password, user.password, function (err, result) {
          if (err) {
            // req.flash('danger', 'Authentication failed');
            // return res.redirect('/login');
            return res.json({
              success: false,
              message: "Authentication Failed"
            });
          }
          if (result) {
            const token = jwt.sign({
              email: user.email,
              userId: user._id
            },
              'secret',
              {
                expiresIn: "1h"
              }
            );
            // req.flash('success', 'You are now logged in');
            // return res.redirect('/timeline');
            return res.status(200).json({
              success: true,
              message: "You are now logged in",
              token: token,
              user: { id: user._id, email: user.email, username: user.username, name: user.name }
            });
          }
          // req.flash('danger', 'Authentication failed');
          // return res.redirect('/login');
          return res.json({
            success: false,
            message: "Authentication Failed"
          });
        });
      })
      .catch(function (err) {
        console.log(err)
        res.status(500).json({
          error: err
        });
      });
  });
};


// // Nodemailer Function
// async function sendEmail(newUser) {
//     const output = `<p>Welcome ${newUser.name} to our timeline app. We are glad to have you.
//     You are now part of this family. Cheers!</p>`;

//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 465,
//         secure: true, // true for 465, false for other ports
//         service: 'Gmail',
//         auth: {
//             user: 'saadsalmankhan.9444@gmail.com', // generated ethereal user
//             pass: 'ZnIaTjFh54321' // generated ethereal password
//         }
//         // tls: {
//         //     rejectUnauthorized: false
//         // }
//     });

//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//         from: '"Saad 👻" <saadsalmankhan.9444@gmail.com>', // sender address
//         to: newUser.email, // list of receivers
//         subject: "Welcome to Timeline App ✔", // Subject line
//         text: "Hello world?", // plain text body
//         html: output // html body
//     });

//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// }