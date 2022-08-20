const express = require('express');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');


require('dotenv').config(); //.env file





//connecting to the MongoDB database

const mongo_database = process.env.MONGOSECRET;


const app = express();

app.use(express.json()); //using this to accept json POST requests

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

let data = [
    
    {
        "title": 'This is a sample title',
        "body": 'This is the body',
        "author": 'Stavros',
        "id": 64
    },
    {
        "title": 'This is a sample title as well',
        "body": 'This is the body, too',
        "author": 'Stavros',
        "id": 65
    }
];





app.get("/blogs", (req,res) => {
    res.json(data);
    console.log('Data sent!');
});

app.get("/blogs/:id", (req,res) => {
    data.forEach((blog) => {
        if (req.params.id == blog.id) {
            console.log('Match found');
            res.json(blog);
        } 
    }) 
});


app.get("/blogs/delete/:id", (req,res) => {
    console.log('Blog deleted by the server');

    data.filter((item) => {
        if (req.params.id == item.id) {
            data.pop(item);
            console.log(data);
        }
    });


    res.redirect("/blogs");
});


//POST request to create the blog
app.post("/blogs/create", (req,res) => {


    const fetchedData = req.body;
    console.log("Data received");

    const newId = data[data.length-1].id + 1;
    //setting a new id to give to the new element
    
    console.log(newId);

    //setting the fetchedData new id
    fetchedData.id = newId;

    //pushing the fetched data into the array
    data.push(fetchedData);

    

    res.redirect("/blogs");
});

const PORT = process.env.PORT || 8001;

app.listen(PORT , () => {
    console.log('Server has started on port ' + PORT);
})