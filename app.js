const mongoose  = require('mongoose');
const User = require('./models/model'); // Ensure the model is properly named with an uppercase initial
const express = require('express');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

app.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body); 
        await newUser.save();
        res.send('User saved successfully');
    } catch (error) {
        res.status(500).send('Error saving user');
        console.error(error);
    }
});

app.listen(3146, () => {
    console.log('Server is running on port 3146');
});

async function createIndex() {
    try {
        const collection = mongoose.connection.collection('users'); 
        const index_res = await collection.createIndex({ price: 1 });
        const index_res1 = await collection.createIndex({ manufacturer: 1 });

        console.log(`Index Created Successfully: ${index_res,index_res1}`);

        const indexes = await collection.indexes();
        console.log('Indexes in the Collection:', indexes);
    } catch (error) {
        console.error('Error creating index:', error);
    }
}

createIndex()   ;