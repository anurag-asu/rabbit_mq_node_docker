const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer")

const router = express.Router();
const upload = multer()

const app = express()

const port = 3001;

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { publishMessage } = require('./publisher')
const { get_ipfs_hash } = require('./pinata')

router.post('/publish', async(req, res)=>{

    let { image_url = '', image_hash = '' } = req.body;

    const payload = {
      image_hash,
      image_url
    }

    await publishMessage(payload);

    res.status(200).send({
      "message-published" : true
  })
})

router.post('/pinata', upload.single('file'), async (req, res) => {
  
  const pinata_data = await get_ipfs_hash(req.file);
  
  if(pinata_data){
    res.status(200).send({
      pinata_data
    });
  }  else {
    res.status(500).send({
      'error': "oops! something went wrong"
    });
  }
})

app.use("/", router);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})