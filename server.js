const express = require('express');
const morgan = require('morgan');

const app = express();

const blogPostRouter = require('./blogPostRouter');

//log the http layer
app.use(morgan('common'));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Blog_app/index.html');
});

//when request come into '/blogpostrouster', we will route then to the express
app.use('/blog-posts', blogPostRouter);

app.listen(process.env.port || 8080, () => {
    console.log('Your app is listening on port ${process.env.Port || 8080}');
});