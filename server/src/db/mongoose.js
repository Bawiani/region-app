const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log('Connection successful!');
    } else {
        console.log('Connection unsuccessful!');
    }
});