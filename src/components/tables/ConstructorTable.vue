<template>
  <base-card class="constructorTableWrapper">
    <table>
      <thead>
        <tr>
          <th title="Position">POS</th>
          <th>Team</th>
          <th title="Points">PTS</th>
        </tr>
      </thead>
      <tbody>
        <keep-alive>
          <constructor-row
            v-for="constructor in constructors"
            :key="constructor.id"
            :position="constructor.position"
            :team="constructor.team"
            :points="constructor.points"
            @click="openInNewTab(constructor.url)"
          ></constructor-row>
        </keep-alive>
      </tbody>
    </table>
  </base-card>
</template>

<script>
import ConstructorRow from './rows/ConstructorRow.vue';
export default {
  props: ['openInNewTab'],
  components: {
    ConstructorRow
  },
  data() {
    return {
      constructors: []
    };
  },
  created() {
    this.getStandings();
  },
  methods: {
    checkLocal() {
      // Check local storage
      const oldTime = localStorage.getItem('constructorStandingsTime');
      if (oldTime) {
        // local data exists, check timing
        let intOldTime = parseInt(oldTime);
        // Time limit of 60 seconds before checking api
        const timeLimit = 60;
        if (intOldTime + timeLimit <= Math.floor(Date.now() / 1000)) {
          this.getStandings();
        } else {
          // Use local storage instead of api
          let constructorStandings = JSON.parse(
            localStorage.getItem('constructorStandings')
          );
          this.populateConstructorArray(constructorStandings);
        }
      } else {
        this.getStandings();
      }
    },
    getStandings() {
      fetch('https://api.samueltribe.com/constructorStandings.json')
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(data => {
          const constructorStandings =
            data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
          localStorage.setItem(
            'constructorStandings',
            JSON.stringify(constructorStandings)
          );
          const time = Math.floor(Date.now() / 1000);
          localStorage.setItem('constructorStandingsTime', time);
          this.populateConstructorArray(constructorStandings);
        });
    },
    populateConstructorArray(constructorStandings) {
      for (const id in constructorStandings) {
        const constructor = constructorStandings[id].Constructor;
        this.constructors.push({
          id: constructor.constructorId,
          position: parseInt(id) + 1,
          team: constructorStandings[id].Constructor.name,
          points: constructorStandings[id].points,
          url: constructor.url
        });
      }
    }
  }
};
</script>
