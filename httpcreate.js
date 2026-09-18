const express = require('express');
const path = require('path');
const app = express();

app.get('/aboutit', (req, res) => {
    res.status(200);
    
    
    res.set('Content-Type', 'text/html');
    
    res.sendFile(path.join(__dirname,'index.html'));

});

app.listen(3200, () => {
    console.log(' http://localhost:3200/aboutit');
});