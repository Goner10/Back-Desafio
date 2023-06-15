const express = require("express");
const app = express();
const cors = require('cors')
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const { dbConnection } = require("./config/config");

app.use(cors())
app.use(express.json());

dbConnection();
app.use('/canalDifusiones', require('./routes/canalDifusiones'));
app.use('/course', require('./routes/course'));
app.use('/users', require('./routes/users'));
app.use('/comments', require('./routes/comments'));
app.use('/events', require('./routes/events'));
app.use('/news', require('./routes/news'));
app.use('/tags', require('./routes/tags'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
