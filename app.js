import express from "express";
import "dotenv/config";
import indexRouter from "./routes/indexroute.js";

const app = express();

app.use("/",indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT,(err)=>{
    if(err) {
        console.error(err);
        return;
    }
    console.log(`Server is listening at PORT ${PORT}`);
})