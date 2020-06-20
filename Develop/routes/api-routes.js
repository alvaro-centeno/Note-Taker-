const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

let notesData = [];

router.get('/api/notes', async (req, res) => {
    let notesData = await readFileAsync('./db/db.json');
    notesData = JSON.parse(notesData);
    res.json(notesData);
});


router.post('/api/notes', async (req, res) => {
    let notesData = await readFileAsync('./db/db.json');
    notesData = JSON.parse(notesData);
    let id = notesData.length;
    const { title, text } = req.body;
    notesData.push({ title, text, id });
    console.log(notesData);
    await writeFileAsync('./db/db.json', JSON.stringify(notesData, null, 2));
    res.send({ msg: 'success' });
})

router.delete('/api/notes/:id', async (req, res) => {
    let notesData = await readFileAsync('./db/db.json');
    notesData = JSON.parse(notesData);
    notesData = notesData.filter(note => {
        return note.id != req.params.id;
    });
    await writeFileAsync('./db/db.json', JSON.stringify(notesData, null, 2));
    res.send({ msg: 'success' });
});





module.exports = router;