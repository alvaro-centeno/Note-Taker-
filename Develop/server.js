const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

const clientRoutes = require('./routes/client-routes');
app.use(clientRoutes);

const apiRoutes = require('./routes/api-routes');
app.use(apiRoutes);

app.listen(PORT, () => console.log(`Listening at: http://localhost:${PORT}`));