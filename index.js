const express = require("express");
const app = express();
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const eventRoutes = require('./routes/eventRoutes');
require("dotenv").config();
const PORT = process.env.PORT || 8080;

const { dbConnection } = require("./config/config")

app.use(express.json())

app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/events', eventRoutes);

dbConnection()

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
