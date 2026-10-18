import passport from "passport";
import { Router } from "express";
import { getIndexContent,createUser,logOutUser,addMember,addAdmin } from "../controllers/indexcontroller.js";
import { getSignUpForm,getLogInForm,getMembersForm,getAdminForm } from "../controllers/formcontroller.js";

const indexRouter = Router();

function requireAuth(req,res,next) {
    if(req.isAuthenticated()) {
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

export default indexRouter;