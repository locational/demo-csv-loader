<template>
  <div class="wrapper">
    <div class="load-file">
      <h3>CSV to json coneveter</h3>
      <input
        type="file"
        name="file"
        placeholder="Upload file"
        @input="select_file"
      />
      <div class="errors" v-if="load_error_messages">
        <span v-for="(i, err) in load_error_messages" :key="i"
          >h,{{ err }}</span
        >
      </div>
    </div>
    <div class="data-field-mapper" v-if="file_selected">
      <h3>Data field mapper</h3>
      <h4>Select algorithm</h4>
      <select v-model="selected_algo" @change="select_algo">
        <option v-for="(algo, i) in algos" :key="i" :value="algo.fn_name">
          {{ algo.fn_name }}
        </option>
      </select>
      <div v-if="required_field">
        <table
          v-if="required_field.length > 0"
          style="margin-left:30%; margin-top:10px;"
        >
          <tr>
            <th>Required fields</th>
            <th>Fields present in uploaded file</th>
          </tr>
          <tr v-for="(field, i) in required_field" :key="i">
            <td ref="data">{{ field.field }}</td>
            <td>
              <select
                v-if="get_file_headers"
                v-model="field.value"
                ref="field_value"
              >
                <option
                  v-for="(header, i) in get_file_headers"
                  :key="i"
                  :value="header"
                  >{{ header }}</option
                >
              </select>
            </td>
          </tr>
        </table>
      </div>

      <button v-if="selected_algo" @click="change_keys">submit</button>
    </div>
    <div class="json-preview" v-if="json_preview && response">
      <h3>Data as json</h3>
      <pre v-if="geojson">
          {{ geojson }}
      </pre>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import download from "downloadjs";
import {
  load_data_from_file,
  read_file_content,
  parse_raw_data
} from "../lib/load_file";

import { replace_keys } from "../lib/replace_keys";
import { get_keys } from "../lib/get_keys";
import { algos } from "../lib/algos";
import { Algo, AlgoField, Result, RequiredField } from "../lib/types";
import { convert2geojson, get_numeric_fields } from "../lib/convert_geojson";

export default Vue.extend({
  name: "csv2json",
  data() {
    return {
      load_error_messages: null as null | string[],
      raw_csv: null as null | string,
      file_selected: false,
      response: null as null | Result,
      json_preview: false,
      algos: algos,
      get_file_headers: null as null | string[],
      selected_algo: "",
      algo_fields: null as null | undefined | AlgoField[],
      required_field: null as null | RequiredField[],
      file_name: null as null | string,
      geojson: null as null | JSON
    };
  },
  methods: {
    async select_file(event: Event) {
      const files = (event.target as HTMLInputElement).files;

      if (files) {
        this.file_name = files[0].name;
        this.file_selected = !this.file_selected;
        this.response = await load_data_from_file(files[0]);

        this.raw_csv = await read_file_content(files[0]);
        if (this.response.meta?.fields) {
          this.get_file_headers = this.response.meta?.fields;
        }
      }
    },
    select_algo() {
      for (let i = 0; i <= this.algos.length - 1; i++) {
        if (this.algos[i].fn_name === this.selected_algo) {
          this.algo_fields = this.algos[i].fields;
        }
      }
      this.required_field = [];
      this.algo_fields?.forEach((element: AlgoField) => {
        if (this.get_file_headers) {
          this.required_field?.push({
            field: element.field_name,
            value: get_keys(element.field_name, this.get_file_headers)
          });
        }
      });
    },
    async change_keys() {
      this.json_preview = !this.json_preview;
      this.required_field?.forEach((el: RequiredField) => {
        if (el.value !== "" && el.value !== null && el.field) {
          if (this.raw_csv) {
            this.raw_csv = replace_keys(el, this.raw_csv);
          }
        }
      });

      if (this.file_name) {
        this.response = await parse_raw_data(this.file_name, this.raw_csv);

        if (this.raw_csv && this.response.data) {
          this.geojson = await convert2geojson(
            this.raw_csv,
            get_numeric_fields(this.response.data[0])
          );
        }

        this.$emit(
          "set_incoming_geodata_and_filename",
          this.geojson,
          this.file_name
        );
      }
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
.json-preview {
  border: 1px solid;
  border-radius: 2px;
  padding: 10px;
  margin-top: 10px;
}

.data-field-mapper {
  border: 1px solid;
  border-radius: 2px;
  padding: 10px;
  margin-top: 10px;
}
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}

.wrapper {
  margin-left: 10px;
}
</style>
