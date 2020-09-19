// const express = require('express');
// const mongoose = require('mongoose');
// const Cards = require("./dbCards.js");

import express from "express";
import mongoose from "mongoose";
import Cors from "cors";

import Cards from './dbCards.mjs';

//App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = 'mongodb+srv://admin:NpznuvvlZtSt70Bx@cluster0.bfteh.mongodb.net/tinderdb?retryWrites=true&w=majority';

//Middlewares
app.use(express.json());
app.use(Cors());

//DB Config
mongoose.connect(connection_url, {
    useNewUrlParser: true, //Adding it for a smooth use with mongoose
    useCreateIndex: true, //bcs mongoose is in development mode
    useUnifiedTopology: true,
})

//API Endpoints
app.get('/', (req,res) => res.status(200).send('Hello Dan'));

app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    });
});

app.get('/tinder/cards', (req, res) => {

    Cards.find((err, data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    });
});



//Listener
app.listen(port, () => console.log('Listening on localhost: ${port}'));