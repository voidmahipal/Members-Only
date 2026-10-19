import express from "express";
import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import passport from "passport";
import session from "express-session";
import { Strategy } from "passport-local";
import bcrypt from "bcryptjs";
import indexRouter from "./routes/indexroute.js";
import { getUserByUsername,getUserById } from "./db/queries.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use(
    session({
        secret:process.env.SESSION_SECRET,
        resave:false,
        saveUninitialized:false
    })
);

app.use(passport.session());

passport.use(
    new Strategy(async (username,password,done)=>{
        try{
            const user = await getUserByUsername(username);
            if(!user) {
                return done(null,false,{message:"Incorrect username."});
            }
            const match = await bcrypt.compare(password,user.password);
            if(!match) {
                return done(null,false,{message:"Incorrect password."});
            }
            return done(null,user);
        }catch(err) {
            return done(err);
        }
    })
);

passport.serializeUser((user,done)=>{
    return done(null,user.id);
});

passport.deserializeUser(async (id,done)=>{
    try{
        const user = await getUserById(id);
        return done(null,user);
    }
    catch(err) {
        return done(err);
    }
});

app.use("/",indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT,(err)=>{
    if(err) {
        console.error(err);
        return;
    }
    console.log(`Server is listening at PORT ${PORT}`);
})