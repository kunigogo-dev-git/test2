<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs8>
        <v-card width="100%" height="100%" min-height="300px">
        <v-system-bar lighter>
          <span>Data List</span>
        </v-system-bar>
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
      </v-flex>

      <v-flex xs4>
        <v-card width="100%" height="100%" min-height="300px"
          @drop.prevent="onDropAtDataImport">
          <v-system-bar lighter>
            <span>Import and Information Area</span>
          </v-system-bar>
          <v-card-title>Drop to import area</v-card-title>
          <v-divider></v-divider>
        <v-card-text width="100%" height="100%"></v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
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
    }),
    methods: {
      onDropAtDataImport(event, key = '', image = {}) {
        alert('test')

        let fileList = event.target.files ? event.target.files : event.dataTransfer.files;
        // ファイルが無い時は処理を中止
        if(fileList.length == 0){
          return false;
        }
        let files = [];
        for(let i = 0; i < fileList.length; i++){
          files.push(fileList[i]);
        }
        // 今回は1ファイルのみ送ることにする。
        let file = files.length > 0 ? files[0] : [];
      },
    }
  }
</script>

<style>

</style>
