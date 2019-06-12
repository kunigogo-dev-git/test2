import * as cornerstone from "cornerstone-core"
import * as dicomParser from "dicom-parser"

export default class {
  constructor() {
  }

  setLocalDataStoreID(storeID) {

  }

  async validateFSAPIEntry(fileList) {
    let parsedList = []
    for(let [k, v] of fileList.entries()) {
      console.log(v)
      let parsed = await parseDICOMFile(v)
      parsedList.push(parsed)
    }
    return parsedList
  }
}

export async function parseDICOMFile(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.onload = (file) => {
      let arrayBuffer = reader.result
      let byteArray = new Uint8Array(arrayBuffer)

      // Invoke the paresDicom function and get back a DataSet object with the contents
      var dataSet
      try {
        var start = new Date().getTime()
        dataSet = dicomParser.parseDicom(byteArray)
        // Try to get array of dicom tags
        var taglist = []
        //createDumpedArray(dataSet, taglist);

        var end = new Date().getTime()
        var time = end - start
        if(dataSet.warnings.length > 0)
        {

        }

        resolve({"taglist" : taglist,"dataset": dataSet})
      }
      catch(err)
      {
        var message = err
        if(err.exception) {
            message = err.exception
        }
        reject(message)
      }
    }
    reader.readAsArrayBuffer(file)
  });
}
