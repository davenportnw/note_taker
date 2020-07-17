const express = require ('express');
const app = express();
const fs = require('fs');
const path = require('path');
const { get } = require('http');

//Note Array 

let notes = [];

//Create Server 
// var server = app.listen(3060);
//Heroku Server
var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT)
});


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "Develop/public")));


/* HTML Routing */

//Homepage route
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/index.html"));
});

//Notes route
app.get('/notes', function(req,res) {
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html'));
    
});

app.get('/api/notes', function(res, req) {
    res.sendFile(path.json(_dirname, "Develop/db/db.json" ));
});

app.get("*", function(req, res) {
    res.sentFile(path.join(_dirname, "Develop/public/index.html"));
});


/* API Routes */

//Return SAVED files

app.get('/api/notes', function(req, res) {
    notes = fs.readFile(path.join('Develop/db/db.json'));
    notes = JSON.parse(notes);
    res.json(notes);
});

//Recieve NEW note - SAVE on the reqest body -ADD to db.json

app.post('/api/notes', function(req, res){ 
    //read past note(s)
  notes = fs.readFile('Develop/db/db.json', 'utf8', function(err) {
        if (err) throw err;
    });
    console.log(notes);
    //parse the note
    notes = JSON.parse(notes);
    //add it to the body
    req.body.id = notes.length;
    notes.push(req.body);
    notes = JSON.stringify(notes);

    fs.writeFile("Develop/db/db.json", notes, "utf8", function(err){
        if (err) throw err;
    });
    res.json(JSON.parse(notes));
});
//DELETE note

app.delete('/api/notes/:id', notes, function(err){
    if (err) throw err;

    notes = fs.readFile("Develop/db/db.json", notes, "utf8", function(err) {
        if (err) throw err;
    });

    notes = JSON.parse(notes);

    notes = notes.filter(function(note) {
        return note.id != req.params.id;
    });

    notes = JSON.stringify(notes);

    fs.writeFile("Develop/db/db.json", "utf8", function(err) {
        if (err) throw err;
    });

    res.send(JSON.parse(notes));

});
