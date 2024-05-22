'use strict'

import{ restaurants } from "../models/restaurants.js";

console.log("step1")
restaurants.find({}).lean()
.then((restaurants) => {
    console.log(restaurants)
})
.catch(err => console.log(err));

