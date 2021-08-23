<template>
  <TheHeader title="F1 Standings" />
  <ConstructorTable class="driverTableWrapper" :openInNewTab="openInNewTab" />
</template>

<script>
import TheHeader from "./components/layouts/TheHeader.vue";
//import DriverTable from "./components/tables/DriverTable.vue";
import ConstructorTable from "./components/tables/ConstructorTable.vue";
export default {
  name: "App",
  components: { TheHeader, ConstructorTable },
  data() {
    return {
      selectedTable: "drivers",
    };
  },
  methods: {
    openInNewTab(url) {
      window.open(url, "_blank");
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Quicksand", sans-serif;
}

@media screen and (min-width: 750px) {
  h1 {
    font-size: 3.5rem;
  }

  table {
    font-size: 1.5rem;
  }

  body {
    font-size: 1.5rem;
  }
}

@media screen and (max-width: 749px) {
  h1 {
    font-size: 5vw;
  }

  table {
    font-size: 3vw;
  }

  body {
    font-size: 2.5vw;
  }
}

body {
  margin: 0;
  background-color: #1a2639;
}

#app {
  font-family: "Quicksand", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.driverTableWrapper {
  width: 100%;
  min-width: 200px;
}

tr {
  border-bottom: 1px solid #dddddd;
  text-align: center;
  background-color: #333333;
  color: #ffffff;
  transition: 0.3s;
}

tr:nth-of-type(even) {
  background-color: #1f1f1f;
}

tr:hover {
  cursor: pointer;
  background-color: #b2482e;
  color: #ffffff;
}

tr:last-of-type {
  border-bottom: 4px solid #b2482e;
}

td {
  padding: 2% 1%;
}

span {
  padding-left: 2%;
}

table {
  min-width: 200px;
  width: inherit;
  border-collapse: collapse;
  margin-top: 5px;
  border-radius: 10px;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  border-radius: 10px;
}

thead,
thead tr {
  background-color: #b2482e;
  color: #ffffff;
}

th {
  padding: 2% 1%;
}

th[title] {
  text-decoration: underline dotted;
}
</style>
