const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const fortunes = require('./data/fortunes.json');  
const { json } = require('express/lib/response');



const app = express();

app.get('/fortunes', (req, res) => {
    res.send(fortunes)
});


app.get('/fortunes/random', (req, res) => {
res.json(fortunes[Math.floor(Math.random() * fortunes.length)]);
});


app.get('/fortunes/:id', (req, res) => {
res.json(fortunes.find(f => f.id == req.params.id));
});

const writeFortune = function(json) {
    fs.writeFile('./data/fortunes.json', JSON.stringify(json), err => {
        console.log(err)
    });
}; 

app.post('/fortunes', (req, res) => {
    
  const { brand, color, size, } = req.body;

 const fortune_ids = fortunes.map(f => f.id);

  const new_fortunes = fortune.concat({
    id: (fortune_ids.length > 0 ? Math.max(...fortune_ids) : 0) + 1,
    brand,
    color,
    size
});
    
  writeFortune(new_fortunes);

  res.json(new_fortunes);
});

app.put('/fortunes/:id', (req, res) => {
   const { id } = req.params;
  const old_fortune = fortunes.find(f => f.id == id);

 ['brand', 'color', 'size'].forEach(key => {
     if(req.body[key]) old_fortune[key] = req.body[key];
 });

writeFortune(fortunes);

res.json(fortunes);

});

app.delete('/fortunes/:id', (req, res) => {
    const { id } = req.params;

    const new_fortunes = fortunes.filter(f => f.id != id);

    writeFortune(new_fortunes);

    res.json(new_fortunes)
});

module.exports = app;