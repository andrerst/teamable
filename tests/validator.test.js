// importing the funcs to be tested:
const { isInvalidEmail, isEmptyPayload } = require('../validator')

test('valid e-mail', function () {
    const testPayload = {
        name: "test_name",
        email: "test.email@example.com",
        interests: "testing"
    }
    const result = isInvalidEmail(testPayload) // we expect this result to be FALSE (this is a VALID email address)
    expect(result).toBe(false) // toBe is a MATCHER.. Jest uses matchers to let you test values in different ways. We want to compare the output of our test with a values we expect the function to return.
})

test('valid e-mail', function () {
    const testPayload = {
        name: "test name",
        email: "test.email",
        interests: "testing"
    }
    const result = isInvalidEmail(testPayload)
    expect(result).toBe(true) // we expect this result to be TRUE (this is an INVALID email address)
})

test('empty payload', function () {
    const testPayload = {}
    const result = isEmptyPayload(testPayload)
    expect(result).toBe(true)
})

test('non-empty payload', function () {
    const testPayload = {
        name: "test name",
        email: "test.email@example.com",
        interests: "testing"
    }
    objectLength = Object.keys(testPayload).length // just for confirming on the terminal...
    console.log(objectLength) // just for confirming on the terminal...
    const result = isEmptyPayload(testPayload)
    expect(result).toBe(false)
})