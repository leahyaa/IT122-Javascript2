import express from 'express';
import restaurantData from "./data.js"

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static('./public'));
app.set("view engine", "ejs");


app.get('/', (req, res) => {
    console.log(req.url);
    res.render('home', { restaurants: restaurantData.restaurants });
});

app.get('/about', (req, res) => {
    console.log(req.url)
    res.send('This Page is about the restaurants that I like in Seattle area');
});


app.get('/detail', (req,res) => {
    console.log(req.query)
    let result = restaurantData.getItem(req.query.name);
    console.log(result)
    res.render("details", {
        name: req.query.name, 
        result
        }
    );
});

// handle POST
app.post('/detail', (req,res) => {
    console.log(req.body)
    let found = restaurantData.getItem(req.body.name);
    res.render("details", {name: req.body.name, result: found, restaurantData: restaurant.getAll()});
    
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