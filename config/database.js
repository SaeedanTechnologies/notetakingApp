require("dotenv").config();
const mongoose = require("mongoose")

const db_Connect = () => {
    mongoose.connect(process.env.MONGODB_URL).then((conn) => {
        console.log(`DB Connected Successfully`);
        
    }).catch((err) => {
        console.log("Error Connecting Db", err);
    });

}
module.exports = db_Connect;