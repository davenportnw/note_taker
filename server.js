const express = require ('express');
const app = express();
const fs = require('fs');
const path = require('path');
const { get } = require('http');
let db = path.resolve("Develop/db/db.json");
// app = express.Router();

//Note Array 

let notes = [];
//Create Server 
// var server = app.listen(3060);
//Heroku Server
var PORT = process.env.PORT || 3030;

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT)
});


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("Develop/public"));


/* HTML Routing */

//Homepage route
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/index.html"));
});

//Notes route
app.get('/notes', function(req,res) {
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html'));

});
app.get('/notes.html', function(res, req) {
    res.sendFile(path.json(_dirname, "Develop/db/db.json" ));
});

app.get("*", function(req, res) {
    res.sentFile(path.join(_dirname, "Develop/public/index.html"));
});


/* API Routes */

//Return SAVED files

app.get('/notes.html', function(req, res) {
  fs.readFile(path.resolve(db, "db.json"), "utf8", (err, data) =>{;
    if (err) throw err;
    res.json(data);
    })
  });

//Recieve NEW note - SAVE on the reqest body -ADD to db.json

app.post('/notes.html', function(req, res){ 
    //read past note(s)
    let notes = fs.readFileSync(path.resolve(db, "db.json"), "utf8", function(err) {
        if (err) throw err;
    });
    console.log(notes);
    //parse the note
    let notesArr = JSON.parse(notes);

    //saving user input
    const userInput = {
        id: idNumber,
        title: req.body.tile,
        text: req.body.text
    }
    
    idNumber += 1;
    //add it to the body
    console.log(userInput);
    //stringify input

    const userInputString = JSON.stringify(userInput);
    //adding new notes
    userInputString.push(req.body);

    fs.writeFileSync(path.resolve(db, "db.json"), "utf8", function(err) {
        if (err) throw err;
    });

    res.json(userInputString);

    
  
   
});
//DELETE note

app.delete('/notes.html/:id', notes, function(err){
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
