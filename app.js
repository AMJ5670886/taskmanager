const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db/connect');
const notFound = require('./middlewares/not-found');
const errorHandler = require('./middlewares/error-handler');
const PORT = process.env.PORT || 5000;

//db
connectDB();

//middleware 
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5000");
    next();
});
app.use(cors());
app.use(express.json({extended:false}));

//routes
app.use('/api/p1/tasks',require('./routes/tasks'));
app.use(notFound);
app.use(errorHandler);

app.listen(PORT,
    console.log(`Server is running on ${PORT}......`)
);



