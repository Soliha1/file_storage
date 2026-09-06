const express=require("express");
const router=express.Router()
const upload=require("../middleware/upload")
const {filespostMiddleware}=require("../middleware/filesME")
const {postFile, getFiles}=require("../controller/filesController")
router.use(express.json()) ;

router.get("/", getFiles)
//router.get("/:id", getFilesID)
router.post("/post", upload.single("file"), filespostMiddleware, postFile);
//router.put("/:id", updateFiles)

module.exports = router