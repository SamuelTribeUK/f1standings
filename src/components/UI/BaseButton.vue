<template>
  <button :type="type" :class="mode">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['type', 'mode']
};
</script>

<style scoped>
* {
  transition: 0.3s;
}
button {
  padding: 0.75rem 1.5rem;
  font-family: inherit;
  background-color: #b2482e;
  border: none;
  color: white;
  cursor: pointer;
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
