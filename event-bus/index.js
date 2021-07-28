const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const events = [];

app.get('/events', (req,res) => {
    res.send(events);
})

app.post('/events',async (req, res) => {
    try {
        const event = req.body;

        events.push(event);

        await axios.post('http://posts-clusterip-srv:4000/events', event)
        // await axios.post('http://localhost:4001/events', event)
        // await axios.post('http://localhost:4002/events', event)
        // await axios.post('http://localhost:4003/events', event)

        res.send({status: 'OK'})
    } catch (error) {
        console.error(error.message);
    }
})

app.listen(4005, ()=>{
    console.log('Listening on port 4005');
})