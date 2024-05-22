import mongoose from 'mongoose';
const { Schema } = mongoose;
import {connectionString} from "../src/credentials.js"

// For security, connectionString should be in a separate file and excluded from git
//const connectionString = " ";

mongoose.connect(connectionString, {
    dbName: 'restaurants',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
const restaurantSchema = new Schema({
 name: { type: String, required: true },
 cuisine: String,
 rating: Number,
 location: String,
 businesshours: String
});


const getItem = (name) => {
    return restaurants.find(restaurant => restaurant.name === name);
};


export const restaurants = mongoose.model('restaurant', restaurantSchema);
export {getItem};
