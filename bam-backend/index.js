
const express = require("express")
const connectDB = require("./config/dbConnection");
const app = express();
const dotenv = require("dotenv").config()
const port = process.env.PORT || 5000
const cors = require('cors');

connectDB()

app.use(express.json())
app.use(cors());
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

app.use("/users", require("./routes/userRoutes"))
app.use("/budget", require("./routes/budgetRoutes"))