const express = require('express');

const app = express();

app.use(express.json());
const studentRoutes = require('./route/studentroute');
app.use('/students', studentRoutes);

app.listen(5000, () => {
    console.log('Server is running on port http://localhost:5000');
}); 
