var express = require ('express');
const app = express();
const fs = require('fs');

const notes = '/Users/nicoledavenport/utcode/note_taker/Develop/public/notes.html';
const index = '/Users/nicoledavenport/utcode/note_taker/Develop/public/index.html';
const db = '/Users/nicoledavenport/utcode/note_taker/Develop/db/db.json';
app.use(express.json());

//Create Server 
var server = app.listen(3000);

//Homepage route
app.get('/', function(req, res) {
    res.sendFile(index)
});

//Notes route
app.get('/notes.html', function(req,res) {
    res.sendFile(notes)
});

//API - returned notes

app.get('/api/notes', function(req, res) {
   const savedNotes =  fs.readFile(db , (err, data) => {
       if(err) throw err;
   })
    res.sendFile(savedNotes)
});

//Saved notes

app.post('/api/notes/:id', function (req, res) {
    console.log(req.body);
    const addedNotes = res.send(db);
    const addAll = fs.appendFile(addedNotes, (err, data) => {
        if(err) throw err;
    })
    res.sendFile(addAll);
});
