const multer = require("multer");

const upload = multer({
    dest: "uploads/",
    limits: {
        fileSize: 50 * 1024 * 1024 // 50_000_000
    }
});

module.exports = upload;