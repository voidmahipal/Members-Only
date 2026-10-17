import { Router } from "express";
import { getIndexContent,createUser,addMember,addAdmin } from "../controllers/indexcontroller.js";
import { getSignUpForm,getLogInForm,getMembersForm,getAdminForm } from "../controllers/formcontroller.js";

const indexRouter = Router();

indexRouter.get("/",getIndexContent);

indexRouter.get("/sign-up",getSignUpForm);
indexRouter.post("/sign-up",createUser);

indexRouter.get("/log-in",getLogInForm);

indexRouter.get("/member",getMembersForm);
indexRouter.post("/member",addMember);

indexRouter.get("/admin",getAdminForm);
indexRouter.post("/admin",addAdmin);

export default indexRouter;