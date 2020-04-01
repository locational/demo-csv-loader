<template>
    <div>
        <csv2json  @set_incoming_geodata_and_filename="set_incoming_geodata_and_filename"/>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import csv2json from "../components/csv2json.vue"

export default Vue.extend({
  components:{
      csv2json
  },
  data() {
    return {
      incoming_data: ""
    };
  },
  methods: {
    set_incoming_geodata_and_filename(data: string, filename: string) {
      this.incoming_data = Object.freeze(data);
      console.log(this.incoming_data);
    }
  }
});
</script>

<style>
</style>