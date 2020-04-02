<template>
  <div class="wrapper">
    <div class="load-file">
      <h3>CSV to json coneveter</h3>
      <input type="file" placeholder="Upload file" @input="select_file" />
      <div class="errors" v-if="load_error_messages">
        <span v-for="(i, err) in load_error_messages" :key="i">h,{{err}}</span>
      </div>
    </div>
    <div class="data-field-mapper">
        <h3>Data field mapper</h3>
        <table>
            <tr>
              <th>Required fields</th>
              <th>Select fields</th>
            </tr>
            <tr>
              <td>id</td>
              <td>Yeah</td>
            </tr>
        </table>
  
    </div>
    <div class="json-preview" v-if="data">
      <h3>Data as json</h3>
      <pre>
          {{data[0]}}
      </pre>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { load_data_from_file } from "../lib/load_file";

export default Vue.extend({
  name: "csv2json",
  data() {
    return {
      load_error_messages: null as null | string[],
      valid_csv_loaded: false,
      data:null as null | JSON
    };
  },
  methods: {
    async select_file(file: File) {
      const result = await load_data_from_file(file);
    
      if (result.valid_csv) {
        this.valid_csv_loaded = result.valid_csv;
        this.data = result.data;
        this.load_error_messages = null; // Might want to reset a previous load attempt
        this.$emit("set_incoming_geodata_and_filename", result.data, file.name);
      } else {
        this.valid_csv_loaded = result.valid_csv;
        this.load_error_messages = result.load_error_messages;
        this.$emit("set_incoming_geodata_and_filename", null, null);
      }
    },

    submit_fields(){
      console.log("Empty");
    }
  }
});
</script>

<style scoped>
.load-file {
  border: 1px solid;
  border-radius: 2px;
  padding: 10px;
}
.json-preview{
  border: 1px solid;
  border-radius: 2px;
  padding: 10px;
  margin-top: 10px;
}

.data-field-mapper{
   border: 1px solid;
  border-radius: 2px;
  padding: 10px;
  margin-top: 10px;
}
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}

.wrapper{
   margin-left: 10px;
  
}
</style>