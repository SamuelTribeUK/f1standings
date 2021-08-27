<template>
  <TheHeader title="F1 Standings" />
  <TheTableToggle />
  <ThePageInfo />
  <TheDarkModeToggle />
</template>

<script>
import TheHeader from './components/layouts/TheHeader.vue';
import TheTableToggle from './components/layouts/TheTableToggle.vue';
import ThePageInfo from './components/layouts/ThePageInfo.vue';
import TheDarkModeToggle from './components/layouts/TheDarkModeToggle.vue';

export default {
  name: 'App',
  components: { TheHeader, TheTableToggle, ThePageInfo, TheDarkModeToggle },
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
  min-width: 200px;
  --colour-blue: #1a2639;
  --bg: #fcfcfc;
  --bg-tint: #e8e8e8;
  --colour-headings: #b2482e;
  --colour-table-headings-text: #fcfcfc;
  --colour-table-headings: #b2482e;
  --colour-table-row: #fcfcfc;
  --colour-table-row-accent: #ebebeb;
  --colour-text: #333333;
}

html[data-theme='dark'] {
  min-width: 200px;
  --bg: #1a2639;
  --bg-tint: #2e3a4d;
  --colour-headings: #ffffff;
  --colour-table-headings-text: #ffffff;
  --colour-table-headings: #b2482e;
  --colour-table-row: #333333;
  --colour-table-row-accent: #1f1f1f;
  --colour-text: #ffffff;
}

a {
  color: var(--colour-table-headings);
}

button:focus {
  outline-width: 0;
}

hr {
  border: 0;
  margin: 0 0 5px 0;
  height: 1px;
  background-image: linear-gradient(to right, transparent, #ccc, transparent);
}

p {
  padding: 10px;
  color: var(--colour-text);
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

html.transition,
html.transition *,
html.transition *:before,
html.transition *:after {
  transition: all 650ms !important;
  transition-delay: 0 !important;
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
  background-color: var(--bg);
}

#app {
  font-family: 'Quicksand', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
  background-color: var(--colour-table-row);
  color: var(--colour-text);
  transition: 0.3s;
}

tr:nth-of-type(even) {
  background-color: var(--colour-table-row-accent);
}

tr:hover {
  cursor: pointer;
  background-color: #b2482e;
  color: #ffffff;
}

tr:last-of-type {
  border-bottom: 4px solid var(--colour-table-headings);
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
  background-color: var(--colour-table-headings);
  color: var(--colour-table-headings-text);
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

.material-icons {
  vertical-align: -0.275rem;
}
</style>
