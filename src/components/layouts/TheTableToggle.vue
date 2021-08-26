<template>
  <base-card class="toggleButtons">
    <base-button
      @click="setSelectedTable('driver-table')"
      :mode="driversButtonMode"
      >Drivers</base-button
    >
    <base-button
      @click="setSelectedTable('constructor-table')"
      :mode="constructorsButtonMode"
      >Constructors</base-button
    >
  </base-card>
  <DriverTable
    v-show="selectedTable === 'driver-table'"
    :openInNewTab="openInNewTab"
  />
  <ConstructorTable
    v-show="selectedTable === 'constructor-table'"
    :openInNewTab="openInNewTab"
  />
</template>

<script>
import DriverTable from '../tables/DriverTable.vue';
import ConstructorTable from '../tables/ConstructorTable.vue';

export default {
  components: {
    DriverTable,
    ConstructorTable
  },
  data() {
    return {
      selectedTable: 'driver-table'
    };
  },
  computed: {
    driversButtonMode() {
      return this.selectedTable === 'driver-table' ? null : 'flat';
    },
    constructorsButtonMode() {
      return this.selectedTable === 'constructor-table' ? null : 'flat';
    }
  },
  methods: {
    setSelectedTable(table) {
      this.selectedTable = table;
    },
    openInNewTab(url) {
      window.open(url, '_blank');
    }
  }
};
</script>

<style scoped>
* {
  transition: 0.3s;
}
</style>
