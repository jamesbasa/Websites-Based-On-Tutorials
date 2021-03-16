// Server runs at http://localhost:3000
PORT = 3000;

const express = require('express');
const app = express();

// Use Express to host static files in the 'public' directory
app.use(express.static('public'));

app.listen( PORT, () => console.log(`Listening on port ${PORT}`));
