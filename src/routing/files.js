const express=require("express");
const router=express.Router()
const upload=require("../middleware/upload")
const {filespostMiddleware,}=require("../middleware/filesME")
const {postFile, getFiles, getFileID, downloadFile}=require("../controller/filesController")
router.use(express.json()) ;

router.get("/", getFiles)
router.get("/:id", getFileID)
router.post("/post", upload.single("file"), filespostMiddleware, postFile);
router.get("/:id/download", downloadFile);

module.exports = router