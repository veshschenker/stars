
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const mustache = require('mustache-express');
app.set('view engine', 'html');
app.engine('html', mustache());
app.set('views', __dirname + '/templates');
app.use(express.static('client'));
app.use(bodyParser.json());
const model = require('./model.js');


app.listen(3000, () => {
    console.log("listening at port 3000");
})

app.get('/stars', async (req, res) => { //create a route
    console.log('displaying list of stars template');//1
    var list = await model.getListOfStars();
    console.log(list.length);
    var data = {
        arrayOfStars: list, //this comes from {{#arrayOfStars}}
    }
    res.render('listOfStars', data);
});

app.get('/stars/add', (req, res) => {
    console.log('adding a star');
    res.render('addStar');
});

app.get('/stars/edit/:id', async (req, res) => {
    console.log('editing star');
    var starId = req.params.id;
    var info = await model.getStar(starId);
    if (info) {
        res.render('editStar', info);
        return;
    }
    res.sendStatus(404);
});

app.get('/stars/:id', (req, res) => {
    console.log("rendering stars details");
    var starId = req.params.id;
    var info = model.getStar(starId);
    if (info) {
        res.render('details', info);
        return;
    }
    res.sendStatus(404);
})

app.get('/api/stars', async (req, res) => {
    var stars = await model.getListOfStars();
    res.status(200).send(stars);
});

app.get('/api/stars/:id', async (req, res) => {
    var id = req.params.id;
    var star = await model.getStar(id);
    res.status(200).send(star);
});

app.post('/api/stars', async (req, res) => {
    var star = req.body;
    model.addStar(star);
    res.sendStatus(201);
});

app.delete('/api/stars/:id', async (req, res) => {
    var id = req.params.id;
    try {
        await model.deletStar(id);
        res.sendStatus(200);
    }
    catch (e) {
        res.sendStatus(404);
    }
});

app.put('/api/stars/:id', async (req, res) => {
    var id = req.params.id;
    try {
        await model.updateStar(id, req.body);
        res.sendStatus(200);
    }
    catch (e) {
        res.sendStatus(404);
    }
});


//fist we defined an