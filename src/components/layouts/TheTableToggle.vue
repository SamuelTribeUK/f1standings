<template>
  <base-card class="toggleButtons">
    <router-link to="/driverStandings">
      <base-button
        @click="setSelectedTable('driver-table')"
        :mode="driversButtonMode"
        >Drivers</base-button
      >
    </router-link>
    <router-link to="/constructorStandings">
      <base-button
        @click="setSelectedTable('constructor-table')"
        :mode="constructorsButtonMode"
        >Constructors</base-button
      >
    </router-link>
  </base-card>
  <router-view :openInNewTab="openInNewTab"></router-view>
</template>

<script>
export default {
  data() {
    return {
      selectedTable: 'driver-table',
    };
  },
  computed: {
    driversButtonMode() {
      return this.selectedTable === 'driver-table' ? null : 'flat';
    },
    constructorsButtonMode() {
      return this.selectedTable === 'constructor-table' ? null : 'flat';
    },
  },
  methods: {
    setSelectedTable(table) {
      this.selectedTable = table;
    },
    openInNewTab(url) {
      window.open(url, '_blank');
    },
  },
};
</script>

<style scoped>
* {
  transition: 0.3s;
}
</style>
