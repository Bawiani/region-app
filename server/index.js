require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
require('./src/db/mongoose');
const cors = require('cors');
const regionRouter = require('./src/routers/region');
const userRouter = require('./src/routers/user');
const authRouter = require('./src/routers/auth');

const app = express();
const port = process.env.PORT || 9001;

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.use(express.json());
app.use(cors());
app.use(regionRouter);
app.use(userRouter);
app.use(authRouter);

app.all("*", (req, res) => res.send("Page cannot be found!"));

app.listen(port, () => {
    console.log('Server running on port ' + port);
});