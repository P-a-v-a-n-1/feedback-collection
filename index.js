const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Feedback = require('./models/Feedback'); // Make sure this file is correct

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://pavanp:Pavan1234@cluster0.8vvyj.mongodb.net/feedback?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('views'));

// Route for form submission
app.post('/submit-feedback', (req, res) => {
    const { name, contactNumber, email, message } = req.body;
    const feedback = new Feedback({ name, contactNumber, email, message });

    feedback.save()
        .then(() => res.send('Feedback submitted successfully!'))
        .catch(err => res.status(500).send('Failed to submit feedback.'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
