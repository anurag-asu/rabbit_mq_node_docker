const request = require('request-promise');

const get_ipfs_hash = async (imageData, pinataApiKey, pinataSecretApiKey) => {

    try {

        const resp = await request({
            headers: {
                'Content-Type': `multipart/form-data; boundary= ${imageData._boundary}`,
                'pinata_api_key': pinataApiKey,
                'pinata_secret_api_key': pinataSecretApiKey
            },
            uri: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
            body: imageData,
            method: 'POST'
        });
        
        return resp;

    } catch(e) {
       console.log('get_ipfs_hash error ', e)
    }
  
    
}

module.exports = { get_ipfs_hash };