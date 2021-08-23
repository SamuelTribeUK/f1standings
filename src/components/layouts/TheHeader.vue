<template>
  <header>
    <h1>{{ title }}</h1>
  </header>
</template>

<script>
export default {
  props: ['title'],
};
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #1a2639;
  display: flex;
  justify-content: center;
  align-items: center;
}

header h1 {
  color: white;
  margin: 0;
  font-size: 3rem;
}

/* @media screen and (min-width: 750px) {
  h1 {
    font-size: 3rem;
  }
}

@media screen and (max-width: 749px) {
  h1 {
    font-size: 6vw;
  }
} */
</style>
