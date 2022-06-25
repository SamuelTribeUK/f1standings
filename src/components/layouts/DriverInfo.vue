<template>
  <base-card class="driverTableWrapper">
    <div class="driverInfoContainer">
      <div class="Driver-Picture">
        <img id="driverPic" :src="driverPicUrl" />
      </div>
      <div class="Driver-Name">
        <label for="driverNameText">Driver Name:</label>
        <p id="driverNameText">{{ driverInfo.driverName }}</p>
      </div>
      <div class="Driver-Number">
        <label for="driverNumberText">Driver Number:</label>
        <p id="driverNumberText">{{ driverInfo.driverNumber }}</p>
      </div>
      <div class="Driver-Position">
        <label for="driverPositionText">Driver Position:</label>
        <p id="driverPositionText">{{ driverPositionText }}</p>
      </div>
      <div class="Constructors">
        <label for="constructorsText">Constructors:</label>
        <p id="constructorsText">{{ driverInfo.car }}</p>
      </div>
    </div>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      driverInfo: { driverNumber: this.$route.params.driverNumber },
    };
  },
  computed: {
    driverPicUrl: function () {
      return 'driverPictures/' + this.driverInfo.driverNumber + '.jpg';
    },
    driverPositionText: function () {
      return (
        this.driverInfo.position +
        (['st', 'nd', 'rd'][
          ((((parseInt(this.driverInfo.position) + 90) % 100) - 10) % 10) - 1
        ] || 'th')
      );
    },
  },
  created() {
    console.log(this.$route.params.driverNumber);
    if (this.$route.params.driverName == undefined) {
      let driverStandings = JSON.parse(localStorage.getItem('driverStandings'));
      let driverFound = false;
      for (const id in driverStandings) {
        if (
          driverStandings[id].Driver.permanentNumber ==
          this.$route.params.driverNumber
        ) {
          driverFound = true;
          let d = driverStandings[id].Driver;
          this.driverInfo.driverName = d.givenName + ' ' + d.familyName;
          this.driverInfo.car = driverStandings[id].Constructors[0].name;
          this.driverInfo.points = driverStandings[id].points;
          this.driverInfo.position = driverStandings[id].position;
          this.driverInfo.url = d.url;
        }
      }
      if (!driverFound) {
        this.$router.push('/driverStandings');
      }
      console.log(this.driverInfo);
    } else {
      console.log(this.$route);
      this.driverInfo.driverName = this.$route.params.driverName;
      this.driverInfo.car = this.$route.params.car;
      this.driverInfo.points = this.$route.params.points;
      this.driverInfo.position = this.$route.params.position;
      this.driverInfo.url = this.$route.params.url;
    }
  },
};
</script>

<style scoped>
.driverInfoContainer {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    'Driver-Picture Driver-Name Driver-Name'
    'Driver-Picture Driver-Number Driver-Position'
    'Driver-Picture Constructors Constructors';
}

.Driver-Picture {
  grid-area: Driver-Picture;
  width: 100%;
}

.Driver-Name {
  grid-area: Driver-Name;
}

.Driver-Number {
  grid-area: Driver-Number;
}

.Driver-Position {
  grid-area: Driver-Position;
}

.Constructors {
  grid-area: Constructors;
}

img {
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 26%);
}
</style>
