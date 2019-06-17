import * as cornerstone from "cornerstone-core"
import * as dicomParser from "dicom-parser"

export default class {
  constructor() {
    this.LocalStoreID = 'local'
  }

  setLocalDataStoreID(storeID) {

  }

  async validateFileSystemAPIEntry(fileList) {
    return await validateFSAPIEntry(fileList)
  }

  getBasicDICOMInfo(dataSet) {
    return getBasicDCMInfo(dataSet)
  }

  divideToPatientStudySeries(dataList) {

  }

  registerDataset(info, dataList) {

  }
}

export async function validateFSAPIEntry(fileList) {
  let parsedList = []
  for(let [k, v] of fileList.entries()) {
    try {
      let parsed = await parseDICOMFile(v)
      parsedList.push(parsed)
      console.log(v.name + ' parsed')
    }
    catch(err){
      console.log(v.name + ' is not valid DICOM file')
    }
  }
  return parsedList
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
          console.log('parse process with warnings : ' + file)
        }

        resolve({'taglist' : taglist, 'dataset': dataSet, 'file':file})
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

export function getBasicDCMInfo(dataset) {
  let studyInstanceUid = dataSet.string('x0020000d')
  let seriesInstanceUid = dataSet.string('x0020000e')
  let sopInstanceUid = dataSet.string('x0008018d')
  let patientsName = dataSet.string('x00100010') === undefined ?
    '' : dataSet.string('x00100010')
  let patientId = dataSet.string('x00100020') === undefined ?
    '' : dataSet.string('x00100020')
  let otherPatientIds = dataSet.string('x00101002') === undefined ?
    '' : dataSet.string('x00101002')
  return {
      'studyInstanceUid': studyInstanceUid, 'seriesInstanceUid': seriesInstanceUid,
      'sopInstanceUid': sopInstanceUid, 'patientsName': patientsName,
      'patientId': patientId, 'otherPatientIds': otherPatientIds,
  }
}

export function divideToPatStdSer(dataList) {
  let patients = {}
  for( item in dataList ) {
    let info = getBasicDCMInfo(item)
  }
}
