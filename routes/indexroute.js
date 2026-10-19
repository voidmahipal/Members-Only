import passport from "passport";
import { Router } from "express";
import { getIndexContent,createUser,logOutUser,addMember,addAdmin,createNewMessage,deleteMessageById } from "../controllers/indexcontroller.js";
import { getSignUpForm,getLogInForm,getMembersForm,getAdminForm,getMessageForm } from "../controllers/formcontroller.js";

const indexRouter = Router({mergeParams:true});

function requireAuth(req,res,next) {
    if(req.isAuthenticated()) {
        return next();
    } 
    res.redirect("/");
}
function requireAdminAuth(req,res,next) {
    if(req.isAuthenticated() && req.user.isadmin) {
        return next();
    }
    res.redirect("/");
}

indexRouter.get("/",getIndexContent);

indexRouter.get("/sign-up",getSignUpForm);
indexRouter.post("/sign-up",createUser);

indexRouter.get("/log-in",getLogInForm);
indexRouter.post("/log-in",passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/log-in",
    failureMessage:true,
}));

indexRouter.post("/log-out",logOutUser);

indexRouter.get("/member",requireAuth,getMembersForm);
indexRouter.post("/member",requireAuth,addMember);

indexRouter.get("/admin",requireAuth,getAdminForm);
indexRouter.post("/admin",requireAuth,addAdmin);

indexRouter.get("/messages/:userId",requireAuth,getMessageForm);
indexRouter.post("/messages/:userId",requireAuth,createNewMessage);

indexRouter.post("/delete/:messageId",requireAdminAuth,deleteMessageById);

export default indexRouter;