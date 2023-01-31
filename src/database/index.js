const mongoose = require('mongoose')

mongoose
    .connect('mongodb://localhost:27017/expressjs_tutorial')
    .then(() => console.log("Connected to DB!"))
    .catch((err) => console.error(`Error while connecting to DB ${err}`))


