<template>
  <p>
    This page uses the
    <a href="https://ergast.com/mrd">Ergast Developer API</a> to display the
    current Formula 1 championship standings
  </p>
  <base-card class="footer-card">
    <p class="footer-text">
      Developed by
      <a href="https://samueltribe.com/" target="_blank">Samuel Tribe</a> |
      Source code is on
      <a href="https://github.com/SamuelTribeUK/F1-Standings" target="_blank"
        >GitHub</a
      >
      | Version 1.2.0
    </p>
    <p class="footer-text">
      Icons are
      <a href="https://fonts.google.com/icons">Google Material Icons</a>
    </p>
    <p class="footer-text">
      Favicon made by
      <a
        href="https://www.flaticon.com/authors/smashicons"
        title="Smashicons"
        target="_blank"
        >Smashicons</a
      >
      from
      <a href="https://www.flaticon.com/" title="Flaticon" target="_blank"
        >www.flaticon.com</a
      >
    </p>
  </base-card>
</template>

<script>
export default {};
</script>

<style scoped>
.footer-card {
  margin: 15px auto;
  background-color: var(--bg-tint);
  padding: 0 5px;
  overflow: hidden;
}
</style>
