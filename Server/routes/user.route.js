import express from "express";
import { editProfile, followOrUnfollow, getProfile, getSuggestedusers, login, logout, register } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/:id/profile').get(isAuthenticated,getProfile);
router.route('/:id/edit').post(isAuthenticated,upload.single('ProfilePhoto'),editProfile);
router.route('/suggested').get(isAuthenticated,getSuggestedusers);
router.route('/followorunfollow/:id').post(isAuthenticated,followOrUnfollow);

export default router;
