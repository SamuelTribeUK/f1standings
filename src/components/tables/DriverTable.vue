<template>
  <base-card class="driverTableWrapper">
    <table>
      <thead>
        <tr>
          <th title="Position">POS</th>
          <th title="Number">NUM</th>
          <th>Name</th>
          <th>Car</th>
          <th title="Points">PTS</th>
        </tr>
      </thead>
      <tbody>
        <driver-row
          v-for="driver in drivers"
          :key="driver.id"
          :position="driver.position"
          :driverNumber="driver.number"
          :name="driver.name"
          :car="driver.car"
          :points="driver.points"
          @click="openInNewTab(driver.url)"
        ></driver-row>
      </tbody>
    </table>
  </base-card>
</template>

<script>
import DriverRow from "./rows/DriverRow.vue";
export default {
  props: ["openInNewTab"],
  components: {
    DriverRow,
  },
  data() {
    return {
      drivers: [],
    };
  },
  methods: {
    getStandings() {
      fetch("https://f1.samueltribe.com/driverStandings.json")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          const driverStandings =
            data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
          for (const id in driverStandings) {
            const driver = driverStandings[id].Driver;
            this.drivers.push({
              id: driver.driverId,
              position: parseInt(id) + 1,
              number: driver.permanentNumber,
              name: driver.givenName + " " + driver.familyName,
              car: driverStandings[id].Constructors[0].name,
              points: driverStandings[id].points,
              url: driver.url,
            });
          }
        });
    },
  },
  mounted() {
    this.getStandings();
  },
};
</script>
