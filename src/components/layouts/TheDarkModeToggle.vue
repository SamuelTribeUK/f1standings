<template>
  <div class="toggle-container">
    <input
      type="checkbox"
      id="switch"
      name="theme"
      v-model="isDarkModeEnabled"
      @change="trans"
    /><label for="switch">Toggle</label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDarkModeEnabled: true
    };
  },
  methods: {
    trans() {
      document.documentElement.classList.add('transition');
      window.setTimeout(() => {
        document.documentElement.classList.remove('transition');
      });
      if (this.isDarkModeEnabled) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
    }
  },
  created() {
    let theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      this.isDarkModeEnabled = true;
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      this.isDarkModeEnabled = false;
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }
};
</script>

<style scoped>
.toggle-container {
  position: fixed;
  right: 20px;
  bottom: 5px;
  z-index: 2;
}

input[type='checkbox'] {
  height: 0;
  width: 0;
  visibility: hidden;
}

label {
  cursor: pointer;
  text-indent: -9999px;
  width: 52px;
  height: 27px;
  background: var(--colour-table-headings);
  float: right;
  border-radius: 100px;
  position: relative;
}

label:after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  background: var(--bg);
  border-radius: 90px;
  transition: 0.3s;
}

input:checked + label {
  background: var(--colour-table-headings);
}

input:checked + label:after {
  left: calc(100% - 5px);
  transform: translateX(-100%);
}

label:active:after {
  width: 45px;
}
</style>
