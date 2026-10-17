import express from "express";
import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import indexRouter from "./routes/indexroute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.urlencoded({extended:true}));

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use("/",indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT,(err)=>{
    if(err) {
        console.error(err);
        return;
    }
    console.log(`Server is listening at PORT ${PORT}`);
})