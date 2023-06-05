const express = require("express");
const app = express();
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
require("dotenv").config();
const PORT = process.env.PORT || 8080;

const { dbConnection } = require("./config/config")

app.use(express.json())

// Configurando las rutas
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);

dbConnection()

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
