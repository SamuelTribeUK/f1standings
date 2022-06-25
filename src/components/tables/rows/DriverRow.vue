<template>
  <tr @click="toDriverPage()">
    <td>{{ position }}</td>
    <td>{{ driverNumber }}</td>
    <td>{{ name }}<span class="material-icons">open_in_new</span></td>
    <td>{{ car }}</td>
    <td>{{ points }}</td>
  </tr>
</template>

<script>
export default {
  props: ['key', 'position', 'driverNumber', 'name', 'car', 'points', 'url'],
  methods: {
    toDriverPage() {
      this.$router.push({
        name: 'driverPage',
        params: {
          driverNumber: this.driverNumber,
          driverName: this.name,
          car: this.car,
          points: this.points,
          position: this.position,
          url: this.url,
        },
      });
    },
  },
};
</script>
