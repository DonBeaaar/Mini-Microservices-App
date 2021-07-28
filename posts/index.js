const express = require('express');
// const bodyParser = require('body-parser');
const app = express();
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const posts = {};

// app.use(express.urlencoded());
app.use(express.json({ extended: true }));
app.use(cors());

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = { id, title }
    
    await axios.post('http://event-bus-srv:4005/events', {
        type: 'PostCreated',
        data: { id, title}
    })

    res.status(201).send(posts[id])

})

app.post('/events', (req,res) => {
    console.log('Event received', req.body.type);
    res.send({});
});

app.listen(4000, () => {
    console.log('Listening in port 4000');
})