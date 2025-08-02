const express = require("express");
const mongoose = require("mongoose");
const conectToDB = require("./config/db");
const path = require("path");
const logger = require("./middlewares/logger");
const { notFound, errorHanlder } = require("./middlewares/errors");
const helmet = require("helmet");
const cors = require('cors')
require("dotenv").config();

// Connection To Database
conectToDB();

// Init App
const app = express();

// Static Folder
app.use(express.static(path.join(__dirname, "images")));

//Apply Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(logger);

// Helmet
app.use(helmet());

// Cors Policy
app.use(cors());


// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/upload", require("./routes/upload"));


// Running the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));