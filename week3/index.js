import express from 'express';
import { restaurants } from "./models/restaurants.js";
import cors from 'cors';

const app = express();

app.use('/api', cors()); // set Access-Control-Allow-Origin header for api route
app.use(express.json()); //Used to parse JSON bodies
app.set("port", process.env.PORT || 3000);
app.use(express.static('./public'));
app.set("view engine", "ejs");

console.log("--------------------------------")
app.get('/', (req, res) => {
    restaurants.find({}).lean()
        .then((restaurants) => {
            res.render('home', { restaurants });
        })
        .catch(err => next(err));
});


app.get('/about', (req, res) => {
    console.log(req.url)
    res.send('This Page is about the restaurants that I like in Seattle area');
});


app.get('/detail', (req, res, next) => {
    restaurants.findOne({ name: req.query.name }).lean()
        .then((restaurant) => {
            res.render('details', { result: restaurant });
        })
        .catch(err => next(err));
});


// delete
//delete a restaurant by name
app.get('/delete', (req, res) => {
    restaurants.deleteOne({ name: req.query.name })
        .then((result) => {
            if (result.deletedCount === 1) {
                console.log(`${req.query.name} has been deleted`);
            } else if (result.deletedCount === 0) {
                console.log("Nothing deleted");
            }
        })
        .catch(err => console.log(err));
})


// handle POST
app.post('/detail', (req, res, next) => {
    restaurants.findOne({ name: req.body.name }).lean()
        .then((restaurant) => {
            res.render('details', { result: restaurant });
        })
        .catch(err => next(err));
});


// define 404 handler
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');
});

