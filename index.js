const express = require("express");
const http = require("http");
const { PORT } = require('./utilities/config');
// const connectToDB = require("./db");
const cors = require('cors');
const dotenv = require("dotenv");
const homeRoutes = require('./routes/homeRoutes');
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));

app.use(cors());


app.use('/', homeRoutes);

// connectToDB();
const server = http.createServer(app);

server.listen(PORT, async () => {
  console.log(`server up on port ${PORT}`);
});