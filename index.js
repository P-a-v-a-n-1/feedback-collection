


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Feedback = require('./models/Feedback'); // Make sure this file is correct

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://priyanshusaha944:GlJPHfHv8PguHMk6@cluster0.omrl17a.mongodb.net/FeedbackDb')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('views'));

// Route for form submission
app.post('/submit-feedback', async(req, res) => {
    const { name, contactNumber, email, message } = req.body;
    const feedback = new Feedback({ name, contactNumber, email, message });
    try{
        await feedback.save();
        console.log("Feedback saved Successfully");
        res.send(`
            <html>
            <head>
                <title>Feedback Submmited</title>
            </head>
            <body>
                <h1>Thank You!</h1>
                <p> Your Feedback has been succesfully submitted.</p>
                <a href ="/">Go Back to Form</a>
            </body>
            </html>
        `);
    }
    catch(err){
        console.error("Error in saving the feedback");
        res.status(500).send('There was an error in submitting your feedback.');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
