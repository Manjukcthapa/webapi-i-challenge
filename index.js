// implement your API here
const express = require('express');
const server = express();

const db = require('./data/db')

server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);

server.use(express.json());

server.post("/api/users",(req,res)=>{
    console.log(req.body)
    const user=req.body;
    const {name, bio} =req.body
    if(!name || !bio){
        res.status(400).json({message:"Please provide name and bio for the user." })}
     
         db.insert(user)
         .then(user=>{
              console.log("The new user",user);
              res.status(201).json(user);
        })



    .catch(error=>{
        res.status(500).json({error: "There was an error while saving the user to the database" })

    })


})

// server.post("/api/users" , (req, res) => {
//     const param = req.body;
//     console.log(param)
//     db.insert(param).then((result) => {
//        res.json({ result });
//     })
// })

server.get("/api/users" , (req, res) => {
    db.find().then((data) => {
        res.json({ data });
    }).catch(() => {
        res.statusCode(500).send({ error: "The users information could not be retrieved." })
    })
})

server.get("/api/users/:id" , (req, res) => {
    db.findById(req.params.id).then((data) => {
        res.json({ data });
    }).catch(() => {
        res.statusCode(500).send({ error: "The user information could not be retrieved." })
    })
})

server.delete("/api/users/:id" , (req, res) => {
    db.remove(req.params.id).then((data) => {
        res.json({ data });
    }).catch(() => {
        res.statusCode(500).send({ error: "The user could not be removed" })
    })
})

server.put("/api/users/:id" , (req, res) => {
    db.update(req.params.id, req.body).then((data) => {
        res.json({ data });
    }).catch(() => {
        res.statusCode(500).send({ error: "The user information could not be modified." })
    })
})








