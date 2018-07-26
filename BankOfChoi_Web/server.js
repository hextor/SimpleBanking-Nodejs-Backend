const express = require('express');
const app = express();
//looks for the folder named public and displays the file index.html by default
app.use(express.static('public'));

app.listen(3000, () => console.log('Listening on port 3000'));
