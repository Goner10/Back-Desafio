const express = require("express");
const app = express();
const cors = require('cors')
require("dotenv").config();
const PORT = process.env.PORT || 8080;

const { dbConnection } = require("./config/config");
const { handleErrorType } = require("./middleware/errors");
const { authentication } = require("./middleware/authentication");

app.use(cors())
app.use(express.json());

dbConnection();

app.use('/users', require('./routes/users'));
app.use('/comments', require('./routes/comments'));
app.use('/events', require('./routes/events'));
app.use('/news', require('./routes/news'));

app.use(authentication);
app.use(handleErrorType); 

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
