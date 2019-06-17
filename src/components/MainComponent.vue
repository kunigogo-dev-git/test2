<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs8>
        <v-expansion-panel id>
          <v-expansion-panel-content
          >
            <template v-slot:header>
              <div>Data list</div>
            </template>

            <v-card width="100%" height="100%" min-height="300px">
              <v-data-table
                :headers="headers"
                :items="dataList"
                class="elevation-1"
              >
              <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.id }}</td>
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-center">{{ props.item.age }}</td>
                <td class="text-xs-left">{{ props.item.studyDate }}</td>
                <td class="justify-center layout px-0">
                  <v-icon
                    class="mr-2"
                    @click="editItem(props.item)"
                  >
                    visibility
                  </v-icon>
                  <v-icon
                    @click="deleteItem(props.item)"
                  >
                    history
                  </v-icon>
                </td>
              </template>
              </v-data-table>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>

      <v-flex xs4>
        <v-expansion-panel import>
          <v-expansion-panel-content
          >
            <template v-slot:header>
              <div>Import and Information Area</div>
            </template>
            <v-card width="100%" height="100%" min-height="300px"
              @drop.prevent="onDropAtDataImport">
              <v-card-title>
                <label for="corporation_file" class="btn btn-success">
                  Drop to import or select file(click here)
                  <input type="file" class="drop__input"
                    style="display:none;"
                    id="corporation_file"
                    webkitdirectory directory
                    @change="onChangeAtFolderSelect"
                    >
                </label>
              </v-card-title>
              <v-divider></v-divider>
            <v-card-text width="100%" height="100%"></v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>

      <v-flex xs8>
        <v-expansion-panel id>
          <v-expansion-panel-content
          >
            <template v-slot:header>
              <div>Viewer</div>
            </template>

            <v-card width="100%" height="100%" min-height="300px">
              <ImageView/>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>

      <v-flex xs4>
        <v-expansion-panel id>
          <v-expansion-panel-content
          >
            <template v-slot:header>
              <div>Control Panel</div>
            </template>

            <v-card width="100%" height="100%" min-height="300px">
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>

    </v-layout>

    <v-dialog v-model="progressDialog" max-width="80%">
      <v-card>
        <v-card-title>Import Progress</v-card-title>
        <v-divider></v-divider>
        <v-progress-linear v-model="progressValue"></v-progress-linear>
        <v-card-text height="150px">{{ progressMessage }}</v-card-text>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
  import {getFiles,getFilesFromDragEvent} from "html-dir-content"
  import {default as ImageDataManager} from '../components/imageDataManager.js'

  import ImageView from "../components/ImageView"

  var dataManager = new ImageDataManager()

  export default {
    components: {ImageView} ,
    data: () => ({
      headers: [
        { text: 'ID', align: 'center', value: 'id' },
        { text: 'Name', align: 'center', value: 'name' },
        { text: 'Age', align: 'center', value: 'age' },
        { text: 'Study Date', align: 'center', value: 'studyDate' },
        { text: 'Operation', align: 'center', value: 'action', sortable: false }
      ],
      dataList: [
        { id: 'P00001', name: 'Pat 1', age: 10, studyDate: '2019/04/02' },
        { id: 'P03043', name: 'Pat 2', age: 10, studyDate: '2004/08/02' },
      ],
      progressDialog: false,
      progressValue: 10,
      progressMessage: 'Importing....',
    }),
    methods: {
      async onChangeAtFolderSelect(event) {
        let fileList = event.target.files ? event.target.files : event.dataTransfer.files;
        if(fileList.length == 0){
          return false;
        }
        let files = [];
        for(let i = 0; i < fileList.length; i++){
          files.push(fileList[i]);
        }

        this.progressDialog = true
        var parsedList = null;
        async function parsePart(toParseList) {
          return new Promise((resolve, reject) => {
            let parsedList = dataManager.validateFileSystemAPIEntry(toParseList)
            resolve(parsedList)
          })
        }

        parsedList = await parsePart(files)



        setTimeout(() => {this.progressDialog = false}, 1000)
        //this.progressDialog = false

        console.log("parsed results: ", parsedList);
      },
      onDropAtDataImport(event, key = '', image = {}) {
        getFilesFromDragEvent(event, true) //will perform recusrive traversal
            .then((files) => {
                console.log("we have the files: ", files);
            });

        let fileList = event.target.files ? event.target.files : event.dataTransfer.files;
        // check file counts
        if(fileList.length == 0){
          return false;
        }
        let files = [];
        for(let i = 0; i < fileList.length; i++){
          files.push(fileList[i]);
        }
      },
    }
  }
</script>

<style>

</style>
