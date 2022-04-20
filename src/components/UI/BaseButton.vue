<template>
  <button type="button" :class="mode">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['mode'],
};
</script>

<style scoped>
* {
  transition: 0.3s;
  border-radius: 0;
}
button {
  padding: 0.75rem 1.5rem;
  font-family: inherit;
  background-color: #b2482e;
  border: none;
  border-radius: 0;
  color: white;
  cursor: pointer;
}

button.active {
  background-color: #b2482e;
  color: #ffffff;
  border-color: #b2482e;
}

.flat {
  background-color: transparent;
  color: #b2482e;
}

.flat:hover,
.flat:active {
  background-color: #b2482e;
  color: #ffffff;
  border-color: #b2482e;
}
</style>
