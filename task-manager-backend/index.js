const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/tasks', taskRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
