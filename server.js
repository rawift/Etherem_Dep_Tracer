require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const client = require("prom-client")
const Deposit = require("./models/depositSchema")

const{ listenForDeposits }= require("./functions/Deposit")




const app = express();
const port = process.env.PORT || 8000;


app.set('view engine', 'ejs'); 
app.use(express.static('public'));

const collectDefaultMetrics=client.collectDefaultMetrics;
collectDefaultMetrics({register:client.register})




app.get('/', async (req, res) => {
    const deposits = await Deposit.find(); 
    res.render('index', { deposits: deposits });
});


app.get('/api/deposits', async (req, res) => {
    try {
        const deposits = await Deposit.find();
        res.json(deposits); 
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch deposits' });
    }
});

app.get('/metrics', async (req,res) => {
    res.setHeader('Content-Type', client.register.contentType)
    const metrics = await client.register.metrics()
    res.send(metrics)
})


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); 
    }
};




const startServer = async () => {
    await connectDB(); 

    const server = http.createServer(app);
    server.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });

    listenForDeposits();
};


startServer();


