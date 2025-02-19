const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());

mongoose.connect('mongodb+srv://admin:admin@cluster0.uduq8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    }).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

const User = mongoose.model('User', {
    name: { type: String, required: true },
    age: { type: Number, required: true }
});

app.post('/', async (req, res) => {
    const { name, age } = req.body;
    const newUser = new User({ name, age });

    try {
        await newUser.save();
        res.redirect('/thank-you');
    } catch (err) {
        res.status(500).send('Error saving data');
    }
});


app.get('/thank-you', (req, res) => {
    res.send('Data Saved Succesfully');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});