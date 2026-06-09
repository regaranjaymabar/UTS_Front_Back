import express from "express";
import cors from "cors";
import eventRoutes from "./routes/eventRoute.js"
import categoryRoute from "./routes/categoryRoute.js"
import pembicaraRoute from "./routes/pembicaraRoute.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/",(req,res) => {
    res.send("ini adalah ambadist");
});

app.use("/event", eventRoutes)
app.use("/category", categoryRoute)
app.use("/pembicara", pembicaraRoute)
app.use("/auth", authRoute)
app.use("/user", userRoute)

app.listen(port, () =>{
    console.log(`server is running on http://localhost:${port}`)
} )