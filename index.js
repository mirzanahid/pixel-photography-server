const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
var cors = require('cors');

app.use(cors());


app.get('/', (req, res) => {
    res.send('PixelPhotography api running!')
});


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vsmf7bv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const serviceCollection = client.db('pixelsPhotography').collection('services')
        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })
    }
    finally { }
}
run().catch(error => console.error(error))








app.listen(port, () => {
    console.log(`PixelPhotography server running ${port}`)
})