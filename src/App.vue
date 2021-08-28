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
