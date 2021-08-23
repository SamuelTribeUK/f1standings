<template>
  <tr>
    <td>{{ position }}</td>
    <td>{{ driverNumber }}</td>
    <td>{{ name }}<span class="material-icons">open_in_new</span></td>
    <td>{{ car }}</td>
    <td>{{ points }}</td>
  </tr>
</template>

<script>
export default {
  props: ["key", "position", "driverNumber", "name", "car", "points"],
};
</script>
