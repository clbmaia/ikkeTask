module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    // Create a new Note
    app.post('/rest/notes', notes.create);

    // Retrieve all Notes
    app.get('/rest/notes', notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/rest/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    app.put('/rest/notes/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete('/rest/notes/:noteId', notes.delete);



    const contacts = require('../controllers/contact.controller.js');

    // Create a new Contact
    app.post('/rest/contacts', contacts.create);

    // Retrieve all Contact
    app.get('/rest/contacts', contacts.findAll);

    // Retrieve a single Contact with contactId
    app.get('/rest/contacts/:contactId', contacts.findOne);

    // Update a Contact with contactId
    app.put('/rest/contacts/:contactId', contacts.update);

    // Delete a Contact with contactId
    app.delete('/rest/contacts/:contactId', contacts.delete);



    const transfers = require('../controllers/transfer.controller.js');

    // Create a new Transfer
    app.post('/rest/transfers', transfers.create);

    // Retrieve all Transfer
    app.get('/rest/transfers', transfers.findAll);

    // Retrieve a single Transfer with transferId
    app.get('/rest/transfers/:transferId', transfers.findOne);

    // Update a Transfer with transferId
    app.put('/rest/transfers/:transferId', transfers.update);

    // Delete a Transfer with transferId
    app.delete('/rest/transfers/:transferId', transfers.delete);

    // Retrieve a Transfer with contactId AND valueTransfer
    app.get('/rest/checkTransfer/:contactId&:valueTransfer', transfers.findOneCheck);



    const cards = require('../controllers/card.controller.js');

    // Create a new card
    app.post('/rest/cards', cards.create);

    // Retrieve all card
    app.get('/rest/cards', cards.findAll);

    // Retrieve a single card with cardId
    app.get('/rest/cards/:cardId', cards.findOne);

    // Update a card with cardId
    app.put('/rest/cards/:cardId', cards.update);

    // Delete a card with cardId
    app.delete('/rest/cards/:cardId', cards.delete);



    const users = require('../controllers/user.controller.js');

    // Create a new user
    app.post('/rest/users', users.create);

    // Retrieve all user
    app.get('/rest/users', users.findAll);

    // Retrieve a single user with userId
    app.get('/rest/users/:userId', users.findOne);

   // Retrieve a single user with email
    app.get('/rest/usersEmail/:email', users.findOneEmail);

    // Retrieve a single user with auth
    app.get('/rest/usersAuth/:email&:password', users.findOneAuth);

    // Update a user with userId
    app.put('/rest/users/:userId', users.update);

    // Delete a user with userId
    app.delete('/rest/users/:userId', users.delete);
}
