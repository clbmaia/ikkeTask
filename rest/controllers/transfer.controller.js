const Transfer = require('../models/transfer.model.js');

// Create and Save a new transfer
exports.create = (req, res) => {
    // Validate request
    if(!req.body.contact) {
        return res.status(400).send({
            message: "transfer contact can not be empty"
        });
    }

    // Create a transfer
    const transfer = new Transfer({
        reason: req.body.reason, 
        contact: req.body.contact,
        valueTransfer: req.body.valueTransfer, 
        dateTransfer: req.body.dateTransfer,
        userId: req.body.userId,
        contactId: req.body.contactId

    });

    // Save transfer in the database
    transfer.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the transfer."
        });
    });
};

// Retrieve and return all transfers from the database.
exports.findAll = (req, res) => {
    Transfer.find()
    .sort({updatedAt:-1})
    .then(transfers => {
        res.send(transfers);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving transfers."
        });
    });
};

// Find a single transfer with a transferId
exports.findOne = (req, res) => {
    Transfer.findById(req.params.transferId)
    .then(transfer => {
        if(!transfer) {
            return res.status(404).send({
                message: "transfer not found with id " + req.params.transferId
            });            
        }
        res.send(transfer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "transfer not found with id " + req.params.transferId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving transfer with id " + req.params.transferId
        });
    });
};


// Find a single transfer with a contactId AND valueTransfer
exports.findOneCheck = (req, res) => {
    Transfer.find({ contactId: req.params.contactId, valueTransfer: req.params.valueTransfer })
    .sort({updatedAt:-1})
    .then(transfer => {
        if(!transfer) {
            return res.status(404).send({
                message: "transfer not found with contactId " + req.params.contactId + " and valueTransfer " + req.params.valueTransfer
            });            
        }
        res.send(transfer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "transfer not found with id " + req.params.transferId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving transfer with id " + req.params.transferId
        });
    });
};

// Update a transfer identified by the transferId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.contact) {
        return res.status(400).send({
            message: "transfer contact can not be empty"
        });
    }

    // Find transfer and update it with the request body
    Transfer.findByIdAndUpdate(req.params.transferId, {
        reason: req.body.reason, 
        contact: req.body.contact,
        valueTransfer: req.body.valueTransfer, 
        dateTransfer: req.body.dateTransfer,
        userId: req.body.userId,
        contactId: req.body.contactId
    }, {new: true})
    .then(transfer => {
        if(!transfer) {
            return res.status(404).send({
                message: "transfer not found with id " + req.params.transferId
            });
        }
        res.send(transfer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "transfer not found with id " + req.params.transferId
            });                
        }
        return res.status(500).send({
            message: "Error updating transfer with id " + req.params.transferId
        });
    });
};

// Delete a transfer with the specified transferId in the request
exports.delete = (req, res) => {
    Transfer.findByIdAndRemove(req.params.transferId)
    .then(transfer => {
        if(!transfer) {
            return res.status(404).send({
                message: "transfer not found with id " + req.params.transferId
            });
        }
        res.send({message: "transfer deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "transfer not found with id " + req.params.transferId
            });                
        }
        return res.status(500).send({
            message: "Could not delete transfer with id " + req.params.transferId
        });
    });
};
