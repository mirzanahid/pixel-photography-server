const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());







const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vsmf7bv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log(uri)

async function run() {

    try {
        const serviceCollection = client.db('pixelsPhotography').collection('services')
        app.get('/homeservices', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.limit(3).toArray();
            res.send(services);
        })
        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })
    }
    finally {

    }

}
run().catch(error => console.error(error))


app.get('/', (req, res) => {
    res.send('PixelPhotography api running!')
});
app.get('/a', (req, res) => {
    res.send('PixelPhotography api running!')
});





app.listen(port, () => {
    console.log(`PixelPhotography server running ${port}`)
})