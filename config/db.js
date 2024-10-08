const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to Database");
    } catch (error) {
        console.log("Connection Failed");
    }
};

module.exports = connectDB;