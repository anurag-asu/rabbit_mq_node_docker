const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

const app = express()
const port = 3000

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { publishMessage } = require('./publisher')

router.post('/publish', async(req, res)=>{
    console.log(req.body)
    let { payload } = req.body;

    await publishMessage(payload);

    res.status(200).send({
        "message-sent":true
    })
  })

app.use("/", router);
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})