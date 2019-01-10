const pify = require('pify')
const multer = require('multer')

const { randomString } = require('./crypto')
const sharp = require('sharp')
const dateFormat = require('dateformat')
const toDayPath = dateFormat(new Date(), 'yyyymmdd') + '/'
const mkdirs = require('node-mkdirs')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/image/' + toDayPath)
  },
  filename (req, file, cb) {
    let ext = file.mimetype.split('/')[1]
    cb(null, randomString(16) + Date.now() + '.' + ext)
  }
})
const limits = {
  files: 1,
  fileSize: 1024*1024*5
}
const uploadImage = pify(multer({storage, limits}).single('image'))
const uploadThumbnail = pify(multer({storage, limits}).single('thumbnail'))

const image = async (req, res, next)=>{

  try {

    await mkdirs('./public/image/' + toDayPath)
    
    await uploadImage(req, res)
    
    const path = '/image/' + toDayPath + req.file.filename
    const fileName = req.file.originalname
    
    return res.json({path, fileName})

  } catch (error) {
    next(Error(error))
  }
  
}

const thumbnail = async (req, res, next)=>{
  
  try {
    
    await mkdirs('./public/image/' + toDayPath)

    await uploadThumbnail(req, res)

    const path = '/thumb/' + toDayPath + req.file.filename
    const fileName = req.file.filename
    
    await mkdirs('./public/thumb/' + toDayPath)

    await sharp('./public/image/' + toDayPath + req.file.filename)
    .resize(300, 300)
    .toFile('./public/thumb/' + toDayPath + req.file.filename)

    return res.json({path, fileName})

  } catch (error) {
    next(Error(error))
  }
  
}

module.exports = { image, thumbnail }