const express =require('express')

const router = express.Router()

const postcontrl = require("../Controllers/Postcontroller")

router.post('/addpost',postcontrl.addingpost)

router.get('/getpost',postcontrl.getpost)

router.delete('/deletepost/:id',postcontrl.deletepost)

router.put('/editpost/:id',postcontrl.editpost)


module.exports=router