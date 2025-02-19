const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

mongoose.connect('mongodb+srv://admin:admin@cluster0.uduq8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    }).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => { 
    console.error('Error connecting to MongoDB', err);
});


const humanSchema =  new mongoose.Schema({
    "names":String,
    "ishuman":Boolean 
})

const model = mongoose.model("human",humanSchema);

app.get('/',(req,res) => {
    res.send("welcome to inn Mr")
})

app.post('/zone',async (req,res) => {
    const name = new model(req.body);
    const save_ma = await name.save();
    console.log(save_ma);   
    res.status(202  ).send()
})

mod = new model({"names":"Khushal","ishuman":true})
mod.save();
mod1 = new model({"names":"King","ishuman":false})
mod1.save();


const findone = async() =>{
    try{
        const name = await model.findOne({names:'Kev'})
        console.log(name);
    }
    catch(err){
        console.log("Mazak mat kar bhai")
    }
}
findone();


const upone = async() =>{
    try{
        const name = await model.updateOne({names:'Kev'},{$set : {ishuman:true}})
        console.log(name);
    }
    catch(err){
        console.log("Mazak mat kar bhai")
    }
}
upone();

const delone = async() => {
    try{
        const manxe = await model.deleteOne({names:'Khushal'})
        console.log(manxe);
    }
    catch(err){
        console.log('Nathi madyu bhai')
    }
}
delone();





app.listen(3004,() => {
    console.log(`available at "http://localhost:3004"`)
})