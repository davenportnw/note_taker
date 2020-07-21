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
    console.log('api POST');
    addNotetoJson(req.body);
    res.json(getJson());
    next()
   
});

//DELETE selected notes

app.delete('/api/notes/:id', function(req, res, next) {
    deleteNote(req.params.id);
    // console.log("req.params.id", req.params.id);
    res.json(getJson());
    console.log("req.params.id", req.params.id);
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
        title: data.text,
        text: data.text,
        complete: false,
        hidden: false
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
    json[id].hidden = true;
    saveJson(json);
}