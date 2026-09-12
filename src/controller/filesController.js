const {PrismaClient}=require("@prisma/client")
const prisma=new PrismaClient()
const fs = require("fs");
const path = require("path");

const postFile = async (req, res) => {
    const file = req.file;

    const iteam = await prisma.file.create({
        data: {
            name: file.originalname,
            mimType: file.mimetype,
            size: file.size,
            file_path: file.path
        }
    });

    res.status(201).json({
        success: true,
        data: iteam
    });
};

const getFiles = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 20;

        const skip = (page - 1) * limit;

        const files = await prisma.file.findMany({
            skip: skip,
            take: limit
        });

        res.status(200).json({
            success: true,
            page: page,
            limit: limit,
            data: files
        });

    } catch (error) {
        next(error);
    }
};



const getFileID = async (req, res) => {
    try {
        const file = req.currentFile; 

        return res.status(200).json({
            success: true,
            data: file
        });
    } catch (error) {
        return res.status(500).json({ message: "Something is wrong with server!" });
    }
};




const downloadFile = async (req, res, next) => {
    try {
        const { id } = req.params;

        const file = await prisma.file.findUnique({
            where: {
                id: id
            }
        });

        if (!file) {
            return res.status(404).json({
                success: false,
                message: "File not found"
            });
        }

        if (!fs.existsSync(file.file_path)) {
            return res.status(404).json({
                success: false,
                message: "File does not exist on server"
            });
        }

        res.setHeader("Content-Type", file.mimType);
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${file.name}"`
        );

        const stream = fs.createReadStream(file.file_path);

        stream.pipe(res);

    } catch (error) {
        next(error);
    }
};



// const updateFiles=async(req, res)=>{
//   const files = await prisma.Iteam.update({
//     where: { id: Number(req.params.id) },
//     data: req.body,
//   })
//   res.json(files)
// }


// const deleteFiles=async(req, res)=>{
//     const files =await prisma.Iteam.delete({
//         where: { id: Number(req.params.id) },
//     })
//     res.json({
//         data:files
//     })
// }





module.exports={ getFiles, postFile, getFileID, downloadFile}