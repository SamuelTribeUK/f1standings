<template>
  <router-link
    :to="{
      name: 'driverPage',
      params: {
        driverNumber: driverNumber,
        driverName: name,
        car: car,
        points: points,
        position: position,
        url: url,
      },
    }"
  >
    <tr>
      <td>{{ key }}</td>
      <td>{{ position }}</td>
      <td>{{ driverNumber }}</td>
      <td>{{ name }}<span class="material-icons">open_in_new</span></td>
      <td>{{ car }}</td>
      <td>{{ points }}</td>
    </tr>
  </router-link>
</template>

<script>
export default {
  props: ['key', 'position', 'driverNumber', 'name', 'car', 'points', 'url'],
};
</script>
