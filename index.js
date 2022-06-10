const functions = require('@google-cloud/functions-framework');
const escapeHtml = require('escape-html');
const {Storage} = require('@google-cloud/storage');
const jsonata = require("jsonata");
const fs = require('fs');
const os = require('os');


const storage = new Storage({keyFilename: 'serviceAccount.json'});
const bucket = storage.bucket('gs://safe_route')
const fileName = 'area_statistic.json'
const file = bucket.file(fileName)
const destFileName = os.tmpdir()+ '/area_statistic.json'

async function downloadFile() {
    const options = {
      destination: destFileName,
    };
    
      // Downloads the file
    await file.download(options);
}
  
exports.getAllCoords = async(req, res) => {
  try{
    downloadFile()
  } catch {
    console.log(err)
  }
  
  
  let seeked = req.body.subdistrict
  let obj = JSON.parse(fs.readFileSync(destFileName));
          
  const expression = jsonata("statistic.coordinates")
  expression.assign("a", seeked)
    
  if (seeked = "All") {
    let result = expression.evaluate(obj);
    res.status(200).send(result)
  }
      
}