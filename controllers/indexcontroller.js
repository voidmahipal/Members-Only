import "dotenv/config";
import { addUserInDB,giveMembershipStatus,giveAdminStatus } from "../db/queries.js";

function getIndexContent(req,res,next) {
    res.render("index");
}

async function createUser(req,res,next) {

    const {firstname,lastname,username,password,confirmpassword} = req.body;
    if(password!==confirmpassword) {
        
    }
    try{
        await addUserInDB(firstname,lastname,username,password);
        res.redirect("/log-in");
    }catch(err) {
        next(err);
    }
}
async function addMember(req,res,next) {
    const {userId} = req.user.id;
    const {password} = req.body;
    if(password!==process.env.MEMBER_CODE) {
        res.redirect("/");
    }
    try{
        await giveMembershipStatus(userId);
        res.redirect("/");
    }catch(err) {
        next(err);
    }
}
async function addAdmin(req,res,next) {
    const {userId} = req.user.id;
    const {password} = req.body;
    if(password!==process.env.ADMIN_CODE) {
        res.redirect("/");
    }
    try{
        await giveAdminStatus(userId);
        res.redirect("/");
    }catch(err) {
        next(err);
    }
}

export {getIndexContent,createUser,addMember,addAdmin};