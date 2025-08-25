const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config()

const port = process.env.PORT || 5000;
//middleware
app.use(express.json());
app.use(cors({
  origin: ['https://rococo-haupia-75bf78.netlify.app/'],
  credentials: true
}))


//routes
const bookRoutes = require('./src/books/book.route')

app.use("/api/books",bookRoutes)


async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.use('/',( _req,res ) => {
        res.send("Book store server is running");
    });
  }

  main().then(()=> console.log("Mongodb connected successfully!")).catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })