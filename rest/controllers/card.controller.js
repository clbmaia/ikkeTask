const Card = require('../models/card.model.js');

// Create and Save a new card
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "card name can not be empty"
        });
    }

    // Create a card
    const card = new Card({
        name: req.body.name, 
        cardNumber: req.body.cardNumber,
        type: req.body.type, 
        expiration: req.body.expiration,
        limit: req.body.limit,
        userId: req.body.userId,
        status: 'ativo'

    });

    // Save card in the database
    card.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the card."
        });
    });
};

// Retrieve and return all cards from the database.
exports.findAll = (req, res) => {
    Card.find()
    .sort({updatedAt:-1})
    .then(cards => {
        res.send(cards);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving cards."
        });
    });
};

// Find a single card with a cardId
exports.findOne = (req, res) => {
    Card.findById(req.params.cardId)
    .then(card => {
        if(!card) {
            return res.status(404).send({
                message: "card not found with id " + req.params.cardId
            });            
        }
        res.send(card);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "card not found with id " + req.params.cardId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving card with id " + req.params.cardId
        });
    });
};

// Update a card identified by the cardId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "card name can not be empty"
        });
    }

    // Find card and update it with the request body
    Card.findByIdAndUpdate(req.params.cardId, {
        name: req.body.name, 
        cardNumber: req.body.cardNumber,
        type: req.body.type, 
        expiration: req.body.expiration,
        userId: req.body.userId,
        limit: req.body.limit,
        status: req.body.status
        
    }, {new: true})
    .then(card => {
        if(!card) {
            return res.status(404).send({
                message: "card not found with id " + req.params.cardId
            });
        }
        res.send(card);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "card not found with id " + req.params.cardId
            });                
        }
        return res.status(500).send({
            message: "Error updating card with id " + req.params.cardId
        });
    });
};

// Delete a card with the specified cardId in the request
exports.delete = (req, res) => {
    Card.findByIdAndRemove(req.params.cardId)
    .then(card => {
        if(!card) {
            return res.status(404).send({
                message: "card not found with id " + req.params.cardId
            });
        }
        res.send({message: "card deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "card not found with id " + req.params.cardId
            });                
        }
        return res.status(500).send({
            message: "Could not delete card with id " + req.params.cardId
        });
    });
};
