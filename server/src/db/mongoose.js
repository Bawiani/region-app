const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/RegionDB", { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log('Connection successful!');
    } else {
        console.log('Connection unsuccessful!');
    }
});