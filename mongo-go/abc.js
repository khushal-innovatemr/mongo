const express = require('express');
const data = require('./abc.json')
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/khushal', {
    }).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => { 
    console.error('Error connecting to MongoDB', err);
});

const User = mongoose.model('Data', {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    body: {type:String,required:true}
},'data');

app.post('/json',async(req,res) => {
    for(s of data){
        const dat1=new User(s);
        await dat1.save();
    }
    res.send(data);
})

app.get('/json/:id', (req, res) => {

    const id = Number(req.params.id);
    const dt = data.find(d => d.id === id);
    
    if (dt) {
        res.status(202).send(dt);
        return;
    } else {
        res.status(404).send({ error: 'Item not found' });
    }
});



const PORT = process.env.PORT || 3120;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


