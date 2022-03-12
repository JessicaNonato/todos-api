require('dotenv').config();

const express = require('express');
const cors = require('cors')
const connectDb = require('./config/db.config');


connectDb();

const app = express();
app.use(cors())
app.use(express.json());

app.use('/todos', require('./routes/todos.routes'));

app.listen(process.env.PORT, () => console.log(`server running on port: ${process.env.PORT}`));