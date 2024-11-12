import { Router } from 'express';
import manufacturerRoute from './manufacturer.js';
import brandRoute from './brand.js';
import userRoute from './user.js';
import homeRoute from './home.js';
import authRoute from './auth.js';
const router = Router();
router.use(authRoute);
router.use(manufacturerRoute);
router.use(brandRoute);
router.use(userRoute);
router.use(homeRoute);


export default router;
