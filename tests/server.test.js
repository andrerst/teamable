const { app, server } = require('../server') // Destructured import. We have to import server in order to ask it to close after using it for our test.
const request = require('supertest')

test("test request with valid payload", async function () {
    const testPayload = {
        name: "test name",
        email: "test.email@example.com",
        interests: "testing"
    }

    const response = await request(app)
        .post('/update-profile')
        .send(testPayload)
    console.log(response.body)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("info")
    expect(response.body.info).toBe("user profile data updaded successfully")

    server.close() // closing the application after being used for the test routines

})


test("test request with INvalid payload", async function () {
    const testPayload = {}

    const response = await request(app)
        .post('/update-profile')
        .send(testPayload)
    console.log(response.body)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("error")
    expect(response.body.error).toBe("invalid payload, couldn't update user profile")

    server.close() // closing the application after being used for the test routines

})