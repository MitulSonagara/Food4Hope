const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Logintut")
    .then(() => {
        console.log("mongodb connected"); 
    })
    .catch(() => {
        console.log("failed to connect");
    });
 
const LogInSchema = new mongoose.Schema({ 
    name1: {
        type: String,
        required: true 
    }, 
    email1: {
        type: String,
        required: true
    },
    type1: {
        type: String,
        required: true
    },
    date1: {
        type: String,
        required: true
    },
    time1: {
        type: String,
        required: true
    },
    quantity1: {
        type: String,
        required: true
    },
    location1: {
        type: String,
        required: true
    }
});

const LogInSchema2 = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    }
});

const Collection1 = mongoose.model("Collection1", LogInSchema);
const Collection2 = mongoose.model("Collection2", LogInSchema2);

module.exports = {
    Collection1,
    Collection2
};
