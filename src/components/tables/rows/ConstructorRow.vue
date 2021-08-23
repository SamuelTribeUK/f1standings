<template>
  <tr>
    <td>{{ position }}</td>
    <td>{{ team }}<span class="material-icons">open_in_new</span></td>
    <td>{{ points }}</td>
  </tr>
</template>

<script>
export default {
  props: ["key", "position", "team", "points"],
};
</script>
