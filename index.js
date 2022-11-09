const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const reviewCollection = client.db('pixelsPhotography').collection('reviews')
        app.get('/home_services', async (req, res) => {
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

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const serviceDetails = await serviceCollection.findOne(query);
            res.send(serviceDetails)
        })

        //add service
        app.post('/addService', async (req, res) => {

            const service = req.body;
            const result = await serviceCollection.insertOne(service);
            res.send(result);
        })

        //add review
        app.post('/review', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        })

        // app.get('/reviews', async (req, res) => {
        //     const query = {};
        //     const cursor = reviewCollection.find(query);
        //     const reviews = await cursor.toArray();
        //     res.send(reviews);
        // })

        app.get('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            let query = {
                "service_id": id
            }
            const cursor = reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);

        })


        app.get('/private_reviews', async (req, res) => {
            let query = {};
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
        })
    }
    finally {

    }

}
run().catch(error => console.error(error))


app.get('/', (req, res) => {
    res.send('PixelPhotography api running!')
});






app.listen(port, () => {
    console.log(`PixelPhotography server running ${port}`)
})