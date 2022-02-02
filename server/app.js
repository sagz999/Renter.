const express = require('express');
const app = express();
const env = require('dotenv');
const db = require('./config/dbConnection');
const cors = require('cors');
const { notFound, errorHandler } = require('./middleware/errorMiddlewares')
const userRoutes = require("./routes/userRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const adminRoutes = require("./routes/adminRoutes");

const PORT = process.env.PORT || 8000;

env.config();

//Connecting to database  
db.connect((err) => {
    if (err)
        console.log("Connection error" + err)
    else
        console.log("Database connected to PORT:27017")
});

app.use(cors());
app.use(express.json());

app.use('/renter/user', userRoutes);
app.use('/renter/vendor', vendorRoutes);
app.use('/renter/admin', adminRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT,console.log(`server started on port: ${PORT}`));