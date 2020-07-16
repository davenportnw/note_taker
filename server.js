const express = require ('express');
const app = express();
const fs = require('fs');
const path = require('path');


//Create Server 
var server = app.listen(3030);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "Develop/public")));

/* HTML Routing */
//Homepage route
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/index.html"));
});

//Notes route
app.get('/notes.html', function(req,res) {
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html'));
});


/* API Routes */

app.get('/api/notes', function(req, res) {
    res.sendFile(path.join(__dirname,'Develop/db/db.json'));
})


// app.get('/api/notes', function(req, res) {
//    const savedNotes =  fs.readFile(db , (err, data) => {
//        if(err) throw err;
//    })
//     res.sendFile(savedNotes)
// });

//Saved notes

// app.post('/api/notes/:id', function (req, res) {
//     console.log(req.body);
//     const addedNotes = res.send(db);
//     const addAll = fs.appendFile(addedNotes, (err, data) => {
//         if(err) throw err;
//     })
//     res.sendFile(addAll);
// });
