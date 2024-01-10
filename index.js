const express = require("express");
const http = require("http");
const cors = require('cors');
const dotenv = require("dotenv");
const { PORT } = require('./utilities/config');
const connectToDB = require("./db");
const homeRoutes = require('./routes/homeRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const countryRoutes = require('./routes/countryRoutes');
const stateRoutes = require('./routes/stateRoutes');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }));

app.use(cors());


app.use('/', homeRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', adminRoutes);
app.use('/api/v1', countryRoutes);
app.use('/api/v1', stateRoutes);

connectToDB();
const server = http.createServer(app);

server.listen(PORT, () => {
   console.log(`server up on port ${PORT}`);
});