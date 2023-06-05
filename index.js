const express = require("express");
const app = express();
const userRoutes = require('./routes/users');
const commentRoutes = require('./routes/comments');
const eventRoutes = require('./routes/events');
const newsRoutes = require('./routes/news');
require("dotenv").config();
const PORT = process.env.PORT || 8080;

const { dbConnection } = require("./config/config")

app.use(express.json())

app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/news', newsRoutes);

dbConnection()

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
