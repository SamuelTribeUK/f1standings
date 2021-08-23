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
        <constructor-row
          v-for="constructor in constructors"
          :key="constructor.id"
          :position="constructor.position"
          :team="constructor.team"
          :points="constructor.points"
          @click="openInNewTab(constructor.url)"
        ></constructor-row>
      </tbody>
    </table>
  </base-card>
</template>

<script>
import ConstructorRow from "./rows/ConstructorRow.vue";
export default {
  props: ["openInNewTab"],
  components: {
    ConstructorRow,
  },
  data() {
    return {
      constructors: [],
    };
  },
  methods: {
    getStandings() {
      fetch("https://f1.samueltribe.com/constructorStandings.json")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          const constructorStandings =
            data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
          for (const id in constructorStandings) {
            const constructor = constructorStandings[id].Constructor;
            this.constructors.push({
              id: constructor.constructorId,
              position: parseInt(id) + 1,
              team: constructorStandings[id].Constructor.name,
              points: constructorStandings[id].points,
              url: constructor.url,
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
