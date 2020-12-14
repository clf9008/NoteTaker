//Required dependinces upon application launch  
const express = require("express");
const fs = require("fs");
const path = require('path');

//declaring a constant into global memory that will lauch express and PORT 3000
const app = express();
const PORT = process.env.PORT || 3000;

//data parsing method
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

//require path for routes.js
require('./db/routes/routes.js')(app);

//Application listening event 
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});  