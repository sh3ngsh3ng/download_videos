const path = require('path')
const axios = require('axios').default
const M3U8FileParser = require('m3u8-file-parser');
const fs = require('fs')
const content = fs.readFileSync('./index.m3u8', { encoding: 'utf-8'});


const reader = new M3U8FileParser();
reader.read(content);
let downloadLinkArray = reader.getResult().segments;
// let numOfFiles = reader.getResult().segments.length;

async function downloadFile(downloadLinkArray, downloadFolder) {
    
    
    for (let i = 0; i < downloadLinkArray.length; i++) {
        try {
            let fileName = path.basename(`${i+1}`+".ts")
            let localFilePath = path.resolve(__dirname, downloadFolder, fileName)
            let response = await axios({
                method:'GET',
                url: downloadLinkArray[i+1].url,
                responseType: 'stream'
            })
            const w = response.data.pipe(fs.createWriteStream(localFilePath))
            w.on('finish', () => {
                console.log("Successfully downloaded file " + `${i}`)
            })
        } catch (err) {
            console.log(err)
        }
    }
    
}

downloadFile(downloadLinkArray, "downloads")
