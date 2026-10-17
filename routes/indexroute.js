import { Router } from "express";
import { getIndexContent } from "../controllers/indexcontroller.js";

const indexRouter = Router();

indexRouter.get("/",getIndexContent);

export default indexRouter;