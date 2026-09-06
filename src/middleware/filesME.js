const filespostMiddleware = (req, res, next) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({
            success: false,
            message: "File not found"
        });
    }

    if (file.size > 50 * 1024 * 1024) {
        return res.status(400).json({
            success: false,
            message: "Size can not be more than 50 MB"
        });
    }

    next();
};

module.exports={filespostMiddleware}