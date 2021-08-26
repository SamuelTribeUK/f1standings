<template>
  <TheHeader title="F1 Standings" />
  <TheTableToggle />
  <ThePageInfo />
</template>

<script>
import TheHeader from './components/layouts/TheHeader.vue';
import TheTableToggle from './components/layouts/TheTableToggle.vue';
import ThePageInfo from './components/layouts/ThePageInfo.vue';

export default {
  name: 'App',
  components: { TheHeader, TheTableToggle, ThePageInfo },
  data() {
    return {
      selectedTable: 'drivers'
    };
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Quicksand', sans-serif;
}

a {
  color: #b2482e;
}

hr {
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, transparent, #ccc, transparent);
}

p {
  padding: 10px;
  color: white;
  max-width: 750px;
  text-align: center;
  margin: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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

  button {
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

  button {
    font-size: 2.5vw;
  }
}

body {
  margin: 0;
  background-color: #1a2639;
}

#app {
  font-family: 'Quicksand', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.driverTableWrapper,
.constructorTableWrapper {
  width: 100%;
  min-width: 200px;
  margin: 15px auto;
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

.toggleButtons {
  display: inline-block;
  overflow: hidden;
  margin-bottom: 0 !important;
  margin-top: 10px !important;
  border: solid 3px #b2482e;
}
</style>
