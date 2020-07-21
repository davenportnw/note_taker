const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const { get } = require('http');
const { join } = require('path');




//Heroku Server
var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT)
});


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("Develop/public"));
app.engine('html', require('ejs').renderFile);


/* HTML Routing */

//Homepage route
var rootPage = {root: __dirname + '/Develop/public'};

app.get('/', function(req, res) {
    console.log("test");
    res.sendFile('/index.html', rootPage);
});

//Notes route

app.get('/notes', function(req,res) {
    res.sendFile('/notes.html', rootPage);
});

// app.get("*", function(req, res) {
//     res.sendFile(path.join(__dirname, "Develop/public/index.html"));
// });


/* API Routes */

//Return SAVED files

app.get('/api/notes', function(req, res, next) {
    let json = getJson();
    console.log(json);
    res.json(json);
    next()
  });

//Recieve NEW note - SAVE on the reqest body -ADD to db.json

app.post('/api/notes', function(req, res, next) {
    // console.log('api POST');
    addNotetoJson(req.body);
    res.json(getJson());
    next()
   
});

//DELETE selected notes
app.get('/api/notes/:id', function(req, res, next) {
    let json = getJson();
    res.json(json);
    next();
});

app.delete('/api/notes/:id', function(req, res, next) {
    deleteNote(req.params.id);
    res.json(getJson());
    // res.send(json);
});


//Functions to add/delete/save

//Get the json
function getJson() {
    let data = fs.readFileSync(__dirname + "/Develop/db/db.json");
    let json = JSON.parse(data);

    json.forEach((item, i) => {
        item.id = i + 1;
    });

    return json;
}
// return json as an object

function noteObject(data) {

    let userInput = {
        title: data.title,
        text: data.text,
        // complete: false,
        // hide: false
    }
    return userInput;

}

function addNotetoJson(note) {
    let json = getJson();
    let newNote = noteObject(note);
    json.push(newNote);
    saveNote(json);
}
function saveNote(jsonData) {
    let data = JSON.stringify(jsonData);
    fs.writeFileSync(__dirname + '/Develop/db/db.json', data);
} 

function deleteNote(id) {
    let json = getJson();
    json.slice(id);
    json.pop(id);
    saveNote(json);
}