import mongoose from 'mongoose';
const { Schema } = mongoose;
import { connectionString } from "../src/credentials.js"

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
  rating: String,
  location: String,
  businesshours: String
});


const getItem = (name) => {
  return restaurants.find(restaurant => restaurant.name === name);
};

/*** 
exports.delete = (name) => {
  const rNumber = restaurants.length;
  const restaurants = restaurants.filter((item) => {
    return item.name !== name;
  });
  return { deleted: rNumber !== restaurants.length, total: restaurants.length };
}

exports.add = (newR) => {
  const rNumber = restaurants.length;
  let found = this.get(newR.name);
  if (!found) {
    books.push(newR);
  }
  return { added: rNumber !== restaurants.length, total: restaurants.length };
};
*/

export const restaurants = mongoose.model('restaurant', restaurantSchema);
export {getItem}
