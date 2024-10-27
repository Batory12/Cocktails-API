const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path: '.env-local'});
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.listen(PORT, () => {
    console.log(`Server Listening on: http://localhost:${PORT}`);
});

const cocktails = require('./routes/cocktails');
app.use('/cocktails', cocktails);

const ingredients = require('./routes/ingredients');
app.use('/ingredients', ingredients);