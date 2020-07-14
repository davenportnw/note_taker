var express = require ('express');
const app = express();
const fs = require('fs');

//Create Server 
var server = app.listen(3000);


app.get('/api/notes', function(req,res) {
    res.send('')
})
