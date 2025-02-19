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

const contactSchema = new mongoose.Schema({
    email: { type: String, required: true },
    query: { type: String, required: true },
});

//hooks

contactSchema.pre('save', function(next){
    this.query = this.query.toLowerCase();
    this.email = this.email.toLowerCase();
    next();
});

const Contact = mongoose.model("Contact", contactSchema);

const new_contact = new Contact({email:"jainkhushal033@gmail.com",query:"cellopurostell"});
const new_contact_1 = new Contact({email:"KHUSHAL.JCE21@SOT.PDPU.AC.IN",query:"cellopurostell"});

new_contact.save();
new_contact_1.save();

app.get('/', (req, res) => {
    res.send("Hello World");
});

//save to mongo 
app.post('/contact', async (req, res) => {
    const contact = new Contact({
        email: req.body.email,
        query: req.body.query,
    });

    try {
        await contact.save();
        res.redirect('/thank-you');
    } catch (err) {
        res.status(500).send('Error saving data');
    }
});

app.get('/thank-you', (req, res) => {
    res.send('Data Saved Successfully');
});

// //aggregate function
const aggregateContacts = async () => {
    try {
        const result = await Contact.aggregate([
            { $group: { _id: { $substr: ["$email", 0, 5] }, count: { $sum: 1 } } }
        ]).exec();
        // console.log(result);
    } catch (err) {
        console.error(err);
    }
};
aggregateContacts();

// function aggrega(Contact){
//     try{   
//         const res = Contact.aggregate([
//             { $group: { _id: { $substr: ["$email", 0, 5] }, count: { $sum: 1 } } }
//         ]).exec();
//         console.log(res);
//     }
//     catch(err){
//         console.log(err);
//     }
// }

// aggrega(Contact);


//findOne
const Find = async() => {
    try{
        const find_one = await Contact.findOne({email:'jainkhushal36@gmail.com'})
        console.log(find_one);
    }
    catch(err){
        console.log("Unable to Find the email")
    }
}
Find();

//findall

const Findall = async() => {
    try{
        const find_sall =  await Contact.find({email:'jainkhushal033@gmail.com'})
        console.log("Yaha se start ")
        console.log(find_sall);
        console.log("FIND KARO!!")
    }
    catch(err){
        console.log("Not Mila")
    }
}
Findall();


//updateOne
const UpdateContacts = async() => {
    try{
        const update = await Contact.updateOne({email:"jainkhushal36@gmail.com"}, { $set : {query: "Best Intern"} });
        // console.log(update);
    }
    catch(err){
        console.log("error occured while updating")
    }
}
UpdateContacts();

//Delete One
const DeleteContacts = async() => {
    try{
        const del = await Contact.deleteOne({email:'jainkhushal34@gmail.com'});
        // console.log(del);
        if(!email){
            // console.log("Already Deleted")
        }
    }
    catch(err){
        console.log(`<h1>"ERROR:unable to delete"`)
    }
}
DeleteContacts();

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

