<template>
  <pulse-loader v-if="loading" :loading="loading"></pulse-loader>
  <base-card v-else class="driverTableWrapper">
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
        <keep-alive>
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
        </keep-alive>
      </tbody>
    </table>
  </base-card>
</template>

<script>
import DriverRow from './rows/DriverRow.vue';
export default {
  props: ['openInNewTab'],
  components: {
    DriverRow
  },
  data() {
    return {
      drivers: [],
      loading: false
    };
  },
  methods: {
    checkLocal() {
      this.loading = true;
      // Check local storage
      const oldTime = localStorage.getItem('driverStandingsTime');
      if (oldTime) {
        // local data exists, check timing
        let intOldTime = parseInt(oldTime);
        // Time limit of 60 seconds before checking api
        const timeLimit = 60;
        if (intOldTime + timeLimit <= Math.floor(Date.now() / 1000)) {
          this.getStandings();
        } else {
          // Use local storage instead of api
          let driverStandings = JSON.parse(
            localStorage.getItem('driverStandings')
          );
          this.populateDriverArray(driverStandings);
        }
      } else {
        this.getStandings();
      }
    },
    getStandings() {
      fetch('https://api.samueltribe.com/driverStandings.json')
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(data => {
          const driverStandings =
            data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
          localStorage.setItem(
            'driverStandings',
            JSON.stringify(driverStandings)
          );
          const time = Math.floor(Date.now() / 1000);
          localStorage.setItem('driverStandingsTime', time);
          this.populateDriverArray(driverStandings);
        });
    },
    populateDriverArray(driverStandings) {
      for (const id in driverStandings) {
        const driver = driverStandings[id].Driver;
        this.drivers.push({
          id: driver.driverId,
          position: parseInt(id) + 1,
          number: driver.permanentNumber,
          name: driver.givenName + ' ' + driver.familyName,
          car: driverStandings[id].Constructors[0].name,
          points: driverStandings[id].points,
          url: driver.url
        });
      }
      this.loading = false;
    }
  },
  created() {
    this.checkLocal();
  }
};
</script>
