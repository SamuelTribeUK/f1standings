<template>
  <base-card class="driverTableWrapper">
    <img id="driverPic" />
    <table>
      <thead>
        <tr>
          <th>Driver Name</th>
          <th>Driver Number</th>
          <th>Car</th>
          <th>points</th>
          <th>position</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ driverInfo.driverName }}</td>
          <td>{{ driverInfo.driverNumber }}</td>
          <td>{{ driverInfo.car }}</td>
          <td>{{ driverInfo.points }}</td>
          <td>{{ driverInfo.position }}</td>
        </tr>
      </tbody>
    </table>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      driverInfo: { driverNumber: this.$route.params.driverNumber },
    };
  },
  methods: {
    pictureAjaxRequest(url, callback) {
      console.log('pictureAjaxRequest called');
      var ajax = new XMLHttpRequest();
      ajax.onreadystatechange = function () {
        console.log(this.readyState + ' ' + this.status);
        if (this.readyState == 4 && this.status == 200) {
          callback(this);
        }
        ajax.onerror = function () {
          console.log('Ajax request failed to: ' + url);
        };
        ajax.open('GET', url, false);
        ajax.send();
      };
    },
    getPicture(response) {
      console.log('getPicture called');
      var div = document.createElement('div');
      div.innerHTML = response.responseText;
      var imgs = div.getElementsByTagName('img');
      this.driverInfo.pictureUrl = imgs[0].src;
      console.log(this.driverInfo.pictureUrl);
      document.getElementById('driverPic').href = this.driverInfo.pictureUrl;
    },

    onDocLoad() {
      console.log('onDocLoad called');
      console.log(this.driverInfo.url);
      // TODO: MOVE THIS DRIVER PICTURE DOWNLOADING TO SERVER SIDE AND USE REQUESTS LIKE WE DO FOR API
      fetch(this.driverInfo.url).then(function (response) {
        this.getPicture(response);
      });
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
    this.onDocLoad();
  },
};
</script>
