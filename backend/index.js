const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


require('dotenv').config(); //.env file





//connecting to the MongoDB database

const mongo_database = process.env.MONGOSECRET;

//Connecting using mongoose
mongoose.connect(mongo_database);

//making the blog JSON model
const blogModel = {
    title: {
        type: String
    }, 
    
    body: {
        type: String
    },

    author: {
        type: String,
        default: 'Anonymous'
    }
};

const Blog = mongoose.model('Blog', blogModel);


const app = express();

app.use(express.json()); //using this to accept json POST requests

app.use(cors()); //using cors for local deployment so that we can access the API on the same host
app.use(bodyParser.urlencoded({extended: true}));





app.get("/blogs", (req,res) => {
    
    Blog.find({}, (err,dataFound) => {
        if(!err) {
            res.json(dataFound);
        } else {
            console.log(err);
        }
    });

    console.log('Data sent!');
});

app.get("/blogs/:id", (req,res) => {
    
    const requestedId = req.params.id;


    Blog.findOne({_id: requestedId} , (err,dataFound) => {
        if (err) {
            console.log(err);
            res.send("DONE.")
        } else {
            console.log(dataFound);
            res.json(dataFound);
        }
    });
    

});


app.get("/blogs/delete/:id", (req,res) => {


    const requestedId = req.params.id; //fetching the _id from the parameters

    var query = { _id: requestedId};
   

   Blog.deleteOne(query, function(err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("Item deleted");
        res.send(JSON.stringify(data));
      }
   });


});


//POST request to create the blog
app.post("/blogs/create", (req,res) => {


    const fetchedData = req.body;

    const blog = new Blog({
        title: fetchedData.title,
        body: fetchedData.body,
        author: fetchedData.author
    });


    blog.save((err) => {
        if(!err) {
           res.json({body: "Successfully created!"});
        } else {
            res.json(err);
        }
    })

    
});

const PORT = process.env.PORT || 8001;

app.listen(PORT , () => {
    console.log('Server has started on port ' + PORT);
})