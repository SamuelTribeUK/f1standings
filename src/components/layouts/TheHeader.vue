<template>
  <header>
    <h1>{{ title }}</h1>
  </header>
  <hr />
</template>

<script>
export default {
  props: ['title']
};
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: var(--bg);
  display: flex;
  justify-content: center;
  align-items: center;
}

header h1 {
  color: var(--colour-headings);
  margin: 0;
  font-size: 3rem;
}
</style>
