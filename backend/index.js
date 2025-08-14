const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const db=require("./db");
const { port } = require("./db");
const userRoute = require("./routes/userRoutes");
const doctorRoute = require("./routes/doctorsRoutes");


const server=express();
server.use(cors());
server.use(express.json());

server.use(userRoute);
server.use("/doctors",doctorRoute);

server.get("/",(req,res)=>{
res.status(200).send({msg:"home"});
})

server.listen(port, async () => {
    try {
        await db;
        console.log(`Server running on port ${port}`);
    } catch (error) {
        console.error("Server startup error:", error);
        process.exit(1);
    }
});