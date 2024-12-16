import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import { addComment, addNewPost, bookmarkPost, deletePost, dislikePost, getAllPost, getCommentOfPost, getUserPost, likePost } from "../controllers/post.controller.js";

const router = express.Router();

router.route("/addpost").post(isAuthenticated, upload.single('image'), addNewPost);
router.route("/all").get(isAuthenticated,getAllPost);
router.route("/userpost/all").get(isAuthenticated, getUserPost);
router.route("/:id/like").get(isAuthenticated, likePost);
router.route("/:id/dislike").get(isAuthenticated, dislikePost);
router.route("/:id/comment").post(isAuthenticated, addComment); 
router.route("/:id/comment/all").post(isAuthenticated, getCommentOfPost);
router.route("/delete/:id").delete(isAuthenticated, deletePost);
router.route("/:id/bookmark").get(isAuthenticated, bookmarkPost);

// router.route("/addpost").post( upload.single('image'), addNewPost);
// router.route("/all").get(getAllPost);
// router.route("/userpost/all").get( getUserPost);
// router.route("/:id/like").get( likePost);
// router.route("/:id/dislike").get( dislikePost);
// router.route("/:id/comment").post( addComment); 
// router.route("/:id/comment/all").post( getCommentOfPost);
// router.route("/delete/:id").delete( deletePost);
// router.route("/:id/bookmark").get( bookmarkPost);

export default router;