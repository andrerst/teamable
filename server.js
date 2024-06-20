// import Express
const express = require('express')
const app = express()
// import Parser for read JSON from http
const bodyParser = require('body-parser')
// import Mongo DB
const { MongoClient } = require('mongodb')
// My Functions import
//const myFuncs = require('./validator')
// Another way to import My Functions: DESTRUCTURING
const { isInvalidEmail, isEmptyPayload } = require('./validator')

// console.log(process.env.DB_USER) --> just showing how easy is to get the values of environment variables from any process on the server.
// console.log(process.env.DB_PASS)

// const DB_USER = process.env.DB_USER
// const DB_PASS = process.env.DB_PASS
// or, cleaner, using Destructuring sintax. The process.env is an object and the values inside can be reached using the KEYS inside the object assigning to variables with the same name:
const { DB_USER, DB_PASS, DEV } = process.env
const dbAddress = '127.0.0.1:27017'

// For giving easy access to Database in case of DEVELOPMENT purposes, with no credentials:

/* if (DEV) {
// connect to mongodb database as a DEVELOPER (with no credentials)
    const url = 'mongodb://127.0.0.1:27017'
} else{
// connect to mongodb database as an user or tester
const url = `mongodb://${DB_USER}:${DB_PASS}@127.0.0.1:27017?authSource=company_db`
// console.log("full URL: ", url) -> for test purpose.
} */
// simplifying above if...else, we have a conditional ternary operator:
// condition ? value-if-true : value-if-false
const url = DEV ? `mongodb://${dbAddress}` : `mongodb://${DB_USER}:${DB_PASS}@${dbAddress}?authSource=company_db`

const client = new MongoClient(url)
// database and Collection variables
const dbName = 'company_db'
const collName = 'employees'

app.use(bodyParser.json())
app.use('/', express.static(__dirname + '/dist'))

app.get('/get-profile', async function(req, res) {
    // connect to mongodb database
    await client.connect() 
    console.log('Connected successfully to the server')

    // initiates or get the db and collection: 
    const db = client.db(dbName)
    const collection = db.collection(collName)

    // get data from the database:
    const result = await collection.findOne({id: 1})
    console.log(result)
    // since we connected to mongodb database, we have to disconnect in the end. In this case, just after getting the results:
    client.close()

    response = {}

    if (result !== null) {
        response = {
            name: result.name,
            email: result.email,
            interests: result.interests
        }
    }

    res.send(response)

})

app.post('/update-profile', async function(req,res) {
    const payload = req.body
    console.log(payload)

    if (isEmptyPayload(payload) || isInvalidEmail(payload)) {
        res.send({error: "invalid payload, couldn't update user profile"})
    } else {
        // updating user profile:
        // connect to mongodb database:
        await client.connect() 
        console.log('Connected successfully to the server')

        // initiates or getthe db and collection. This will either create a database (and/or collection) with dbName / colName or switch to it, if it already exists:
        const db = client.db(dbName)
        const collection = db.collection(collName)

        // save payload data to the database:
        // Just creating 2 items, from Instructions from https://www.npmjs.com/package/mongodb
    /*  await collection.insertOne({ _id: 1 })
        await collection.insertOne({ _id: 2 }) */

        payload['id'] = 1
        const updatedValues = { $set: payload }
        await collection.updateOne({ id: 1 }, updatedValues, {upsert: true})
        // since we connected to mongodb database, we have to disconnect in the end:
        client.close()

        res.send({info: "user profile data updaded successfully"})
    }
    
})

const server = app.listen(3000, function(){
    console.log("app listening on port 3000")
})

module.exports = {
    app,
    server
}