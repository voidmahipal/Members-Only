import "dotenv/config";
import bcrypt from "bcryptjs";
import { getAllMessages,addUserInDB,giveMembershipStatus,giveAdminStatus,addNewMessage,deleteMessage } from "../db/queries.js";

async function getIndexContent(req,res,next) {
    const messages = await getAllMessages();
    res.render("index",{user:req.user,messages:messages});
}
async function createUser(req,res,next) {

    const {firstname,lastname,username,password,confirmpassword} = req.body;
    if(password!==confirmpassword) {
        res.redirect("/sign-up");
        return;
    }
    try{
        const hashedPassword = await bcrypt.hash(password,10);
        await addUserInDB(firstname,lastname,username,hashedPassword);
        res.redirect("/log-in");
    }catch(err) {
        next(err);
    }
}
function logOutUser(req,res,next) {
    req.logout((err)=>{
        if(err) {
            return next(err);
        }
        res.redirect("/");
    });
}
async function addMember(req,res,next) {
    const userId = req.user.id;
    const {password} = req.body;
    if(password!==process.env.MEMBER_CODE) {
        return res.redirect("/");
    }
    try{
        await giveMembershipStatus(userId);
        res.redirect("/");
    }catch(err) {
        next(err);
    }
}
async function addAdmin(req,res,next) {
    const userId = req.user.id;
    const {password} = req.body;
    if(password!==process.env.ADMIN_CODE) {
        return res.redirect("/");
    }
    try{
        await giveAdminStatus(userId);
        res.redirect("/");
    }catch(err) {
        next(err);
    }
}
async function createNewMessage(req,res,next) {
    const {title,text} = req.body;
    const {userId} = req.params;
    try{
        await addNewMessage(title,text,userId);
        res.redirect("/");
    }
    catch(err) {
        next(err);
    }
}
async function deleteMessageById(req,res,next) {
    const {messageId} = req.params;
    try{
        await deleteMessage(messageId);
        res.redirect("/");
    }
    catch(err) {
        next(err);
    }
}
export {getIndexContent,createUser,logOutUser,addMember,addAdmin,createNewMessage,deleteMessageById};