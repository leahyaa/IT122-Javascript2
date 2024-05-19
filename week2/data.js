const restaurants = [
    { name: "Hong Kong Bistro", cuisine: "Cantonese", rating: "4.0", location: "Seattle", businesshours: "Monday-Sunday" },
    { name: "Malay Statay Hut", cuisine: "Malaysian", rating: "4.0", location: "Redmond", businesshours: "Closed on Tuesday"},
    { name: "Dilettante Mocha Cafe", cuisine: "Coffee", rating: "4.4", location: "Bellevue", businesshours: "Closed on weekend"},
    { name: "Isarn Thai Soul Kitchen", cuisine: "Thai", rating: "4.4", location: "Kirkland",businesshours: "Monday-Sunday"},
    { name: "Hosoonyi Korean Restaurant", cuisine: "Korean", rating: "4.3", location: "Edmonds", businesshours: "Closed on Tuesday" },
    { name: "Chinook's At Salmon Bay", cuisine: "American", rating: "4.5", location: "Seattle", businesshours: "Monday-Sunday" }
]

const getAll = () => {
    return restaurants;
};

const getItem = (name) => {
    return restaurants.find(restaurant => restaurant.name === name);
};

export default {
    restaurants,
    getAll,
    getItem
};