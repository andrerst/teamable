function isInvalidEmail(userObject) {
    return !userObject.email.includes("@") 
}

function isEmptyPayload(userObject) {
    return Object.keys(userObject).length === 0
}

module.exports = {
    isInvalidEmail,
    isEmptyPayload
}

// Another, and more directly syntax of the function exporting above:
/* exports.isInvalidEmail = (userObject) => {
    return !userObject.email.includes("@")
} */