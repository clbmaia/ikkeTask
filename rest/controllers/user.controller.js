const User = require('../models/user.model.js');


// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "user email can not be empty"
        });
    }

    // Create a user
    const user = new User({
        name: req.body.name, 
        email: req.body.email,
        password: req.body.password,
        status:  'ativo'

    });

    // Save user in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
        });
    });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};

// Find a single user with a email
exports.findOneEmail = (req, res) => {
    User.find({ email: req.params.email })
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with email " + req.params.email
            });            
        }

        var nodemailer = require("nodemailer");

        // create reusable transport method (opens pool of SMTP connections)

        var smtpTransport = nodemailer.createTransport({
          host: "smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "45581b62059a81",
            pass: "37e2518251e192"
          }
        });

        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: "Banco IKKE ✔ <teste-bc7427@inbox.mailtrap.io>", // sender address
            to: user[0].email,
            bcc: "cleberlmaia@gmail.com", // list of receivers
            subject: "Recuperação de Senha ✔", // Subject line
            text: "Segue aqui a senha que você esqueceu:  ✔"+ user[0].password, // plaintext body
            html: "<b>Segue aqui a senha que você esqueceu: "+ user[0].password +" ✔</b>" // html body
        }

        // send mail with defined transport object
        smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                console.log(error);
            }else{

                console.info("Message sent " + user[0].email);
            }

            // if you don't want to use this transport object anymore, uncomment following line
            //smtpTransport.close(); // shut down the connection pool, no more messages
        });



        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with email " + req.params.email
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with email " + req.params.email
        });
    });
};

// Find a single user with a email AND password
exports.findOneAuth = (req, res) => {
    console.log(req.params);
    User.find({ email: req.params.email, password: req.params.password })
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with email " + req.params.email
            });          
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with email " + req.params.email
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with email " + req.params.email
        });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "user name can not be empty"
        });
    }

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
        name: req.body.name, 
        email: req.body.email,
        password: req.body.password
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        res.send({message: "user deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};
