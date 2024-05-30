import express from 'express';
import mongoose from 'mongoose';
import { connectionString } from "./src/credentials.js";
import { restaurants } from "./models/restaurants.js";
import cors from 'cors';

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies
app.set("port", process.env.PORT || 3000);
app.use(express.static('./public'));
app.set("view engine", "ejs");

mongoose.connect(connectionString, {
    dbName: 'your_database_name',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
    console.log('Mongoose connected.');
});

app.get('/', (req, res, next) => {
    restaurants.find({}).lean()
        .then((restaurants) => {
            res.render('home', { restaurants });
        })
        .catch(err => next(err));
});

// Get all restaurants API
app.get('/api/restaurants', (req, res) => {
    restaurants.find({}).lean()
        .then((r) => {
            res.json(r);
        })
        .catch(err => {
            console.error('Database Error:', err);
            res.status(500).send('Database Error occurred');
        });
});

app.get('/about', (req, res) => {
    res.send('This page is about the restaurants that I like in Seattle area');
});

// Get restaurant details
app.get('/detail', (req, res, next) => {
    restaurants.findOne({ name: req.query.name }).lean()
        .then((restaurant) => {
            res.render('details', { result: restaurant });
        })
        .catch(err => next(err));
});

// Get restaurant details API
app.get('/api/restaurants/:name', (req, res) => {
    restaurants.findOne({ name: req.params.name }).lean()
        .then((r) => {
            res.json(r);
        })
        .catch(err => {
            console.error('Database Error:', err);
            res.status(500).send('Database Error occurred');
        });
});

// Delete a restaurant
app.get('/delete', (req, res, next) => {
    restaurants.deleteOne({ name: req.query.name })
        .then((result) => {
            if (result.deletedCount === 1) {
                console.log(`${req.query.name} has been deleted`);
            } else {
                console.log("Nothing deleted");
            }
            res.redirect('/'); // Redirect after deletion
        })
        .catch(err => next(err));
});

// Delete a restaurant API
app.delete('/api/delete/:name', (req, res) => {
    const name = req.params.name;
    restaurants.deleteOne({name})
        .then((result) => {
            if (result.deletedCount === 1) {
                return res.status(200).json({ message: `${name} has been deleted` });
            } else {
                return res.status(404).json({ message: `${name} not found` });
            }
        })
        .catch(err => {
            console.error('Error deleting restaurant:', err);
            res.status(500).json({ error: 'Error' });
        });
});

// Add or update a restaurant using URL parameters
app.get('/api/add/:name/:cuisine/:rating/:location/:businesshours', (req, res, next) => {
    const { name, cuisine, rating, location, businesshours } = req.params;

    restaurants.updateOne(
        { name },
        { name, cuisine, rating, location, businesshours },
        { upsert: true }
    )
        .then(result => {
            console.log(result);
            
            const updated = result.modifiedCount ;
            const added = result.upsertedCount;
            if (updated == 1) {
                res.json({updated})
            } else {
                res.json({added})
            }
        })
        .catch(error => {
            console.error('Error updating/adding restaurant:', error);
            res.status(500).json({ error: 'Error' });
        });
});

// Add or update a restaurant using request body
app.post('/api/add', (req, res, next) => {
    const { name, cuisine, rating, location, businesshours } = req.body;

    restaurants.findOne({ name })
        .then(existingRestaurant => {
            if (existingRestaurant) {
                // Update the existing restaurant
                restaurants.updateOne(
                    { name },
                    { $set: { cuisine, rating, location, businesshours } }
                )
                    .then(result => {
                        res.json({ updated: result.nModified, item: existingRestaurant });
                    })
                    .catch(error => {
                        console.error('Error updating restaurant:', error);
                        res.status(500).json({ error: 'Error' });
                    });
            } else {
                // Create a new restaurant
                const newRestaurant = new restaurants(req.body);
                newRestaurant.save()
                    .then(savedRestaurant => {
                        res.json({ added: 1, item: savedRestaurant });
                    })
                    .catch(error => {
                        console.error('Error saving restaurant:', error);
                        res.status(500).json({ error: 'Error' });
                    });
            }
        })
        .catch(error => {
            console.error('Error finding restaurant:', error);
            res.status(500).json({ error: 'Error' });
        });
});

// Handle POST to render details
app.post('/detail', (req, res, next) => {
    restaurants.findOne({ name: req.body.name }).lean()
        .then((restaurant) => {
            res.render('details', { result: restaurant });
        })
        .catch(err => next(err));
});

// Define 404 handler
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

// Start the server
app.listen(app.get('port'), () => {
    console.log('Express started');
});
