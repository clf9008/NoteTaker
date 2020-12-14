//declaring constants into global memory that require express
const fs = require('fs');
const path = require('path');

module.exports = app => {

    //variable to setup the notes
    fs.readFile("db/db.json","utf8", (err, data) => {

        if (err) throw err;

        var notes = JSON.parse(data);

        //get method to retrieve notes 
        app.get("/api/notes", function(req, res) {
            //respond with saved notes in json
            res.json(notes);
        });

        //APP post route to post a new note to notes array
        app.post("/api/notes", function(req, res) {
            //responds with any notes already in notes array, addes new note to array, then displays array with new note
            res.json(notes[req.params.id]);
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log("Added new note: "+newNote.title);
        });

        //APP get to retrieve any note by id
        app.get("/api/notes/:id", function(req,res) {
            //respond with notes array in json with specific note id
            res.json(notes[req.params.id]);
        });

        //app delete method to delete any note by its id
        app.delete("/api/notes/:id", function(req, res) {
            res.json(notes[req.params.id]);//respond with notes array
            notes.splice(req.params.id, 1);//removed requested note by id
            updateDb();//update database and display note array
            console.log("Deleted note with id");
        });

   
        //Display notes.html when /notes is accessed
        app.get('/notes', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
        
        //Display index.html when all other routes are accessed
        app.get('*', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        //updates the json file whenever a note is added or deleted
        function updateDb() {
            fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
                if (err) throw err;
                return true;
            });
        }

    });

}