const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const postFile = async (req, res) => {
    const file = req.file;

    const item = await prisma.Files.create({
        data: {
            name: file.originalname,
            mimType: file.mimetype,
            size: file.size
        }
    });

    res.status(201).json({
        success: true,
        data: item
    });
};

const getFiles = async(req, res) => {
    const files=await prisma.Iteam.findMany()
    res.json({
        data:files
    })
}

const getFilesID=async(req, res)=>{
    try {
        const files = await prisma.Iteam.findUnique({
            where: {id: Number(req.params.id) }
        });

        res.json({
            data: files
        });
    } catch (error) {
        res.status(404).json({
            message: "Iteam not found"
        });
    }

}




const updateFiles=async(req, res)=>{
  const files = await prisma.Iteam.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  })
  res.json(files)
}


const deleteFiles=async(req, res)=>{
    const files =await prisma.Iteam.delete({
        where: { id: Number(req.params.id) },
    })
    res.json({
        data:files
    })
}





module.exports={ getFiles, postFile, getFilesID, updateFiles, deleteFiles}