const request = require('request-promise');
const fs = require('fs');
const axios = require('axios')
const formData = require('form-data')
const { Readable } = require('stream');


const get_ipfs_hash = async (body) => {
    try {

        console.log(body)
        const imgBuffer = Buffer.from(body.image, 'base64')
        const stream = Readable.from(imgBuffer)
        stream.path = body.productname

        let data = new formData()
        data.append('file', stream);

        const pinata_resp = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS',
            data,
            {
                maxContentLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                    'pinata_api_key': '4663dc103891764f7960',
                    'pinata_secret_api_key': '1a4f0f57e41a5f7c644fb84f740ca77cdc6e7cca55fb050d9c31df58b0374a62'
                }
            }
        )

        return pinata_resp.data

    } catch(e) {
       console.log('get_ipfs_hash error ', e)
       return null
    }
  
}

module.exports = { get_ipfs_hash };