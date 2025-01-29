import { Router } from "express";
import authentication from "./Authentication";

const router = Router()

router.use('/authentication', authentication)

export default router