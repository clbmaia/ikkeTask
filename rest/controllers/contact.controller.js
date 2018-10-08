const Contact = require('../models/contact.model.js');

// Create and Save a new contact
exports.create = (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "contact email can not be empty"
        });
    }

    // Create a contact
    const contact = new Contact({
        name: req.body.name, 
        email: req.body.email,
        cpf: req.body.cpf, 
        account: req.body.account,
        userId: req.body.userId,
        status: 'ativo'
    });

    // Save contact in the database
    contact.save()
    .then(data => {
        return res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the contact."
        });
    });
};

// Retrieve and return all contacts from the database.
exports.findAll = (req, res) => {
    Contact.find()
    .sort({updatedAt:-1})
    .then(contacts => {
        res.send(contacts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving contacts."
        });
    });
};

// Find a single contact with a contactId
exports.findOne = (req, res) => {
    Contact.findById(req.params.contactId)
    .then(contact => {
        if(!contact) {
            return res.status(404).send({
                message: "contact not found with id " + req.params.contactId
            });            
        }
        res.send(contact);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "contact not found with id " + req.params.contactId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving contact with id " + req.params.contactId
        });
    });
};

// Update a contact identified by the contactId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "contact name can not be empty"
        });
    }

    // Find contact and update it with the request body
    Contact.findByIdAndUpdate(req.params.contactId, {
        name: req.body.name, 
        email: req.body.email,
        cpf: req.body.cpf, 
        account: req.body.account,
        userId: req.body.userId,
        status: req.body.status
    }, {new: true})
    .then(contact => {
        if(!contact) {
            return res.status(404).send({
                message: "contact not found with id " + req.params.contactId
            });
        }
        res.send(contact);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "contact not found with id " + req.params.contactId
            });                
        }
        return res.status(500).send({
            message: "Error updating contact with id " + req.params.contactId
        });
    });
};

// Delete a contact with the specified contactId in the request
exports.delete = (req, res) => {
    Contact.findByIdAndRemove(req.params.contactId)
    .then(contact => {
        if(!contact) {
            return res.status(404).send({
                message: "contact not found with id " + req.params.contactId
            });
        }
        res.send({message: "contact deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "contact not found with id " + req.params.contactId
            });                
        }
        return res.status(500).send({
            message: "Could not delete contact with id " + req.params.contactId
        });
    });
};
