// implement your API here
const express = require('express');
const server = express();

const db = require('./data/db')

server.post("/api/users" , (req, res) => {
    res.send("Good Buye World")
})

server.get("/api/users" , (req, res) => {
    db.find().then((data) => {
        res.json({ data });
    }).catch(() => {
        res.statusCode(500).send({ error: "The users information could not be retrieved." })
    })
})

server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);