<template>
  <div>
    <TheHeader
      @sidenavToggle="displaySidenav = !displaySidenav"
    />
    <TheSidenav
      :show="displaySidenav"
      @close="displaySidenav = false"
    />
    <nuxt/>
    <TheFooter />
  </div>
</template>

<script>
  import TheHeader from '~/components/Navigation/TheHeader';
  import TheSidenav from '~/components/Navigation/TheSidenav';
  import TheFooter from '~/components/Navigation/TheFooter';

  export default {
    components: {
      TheHeader,
      TheSidenav,
      TheFooter
    },
    data() {
      return {
        displaySidenav: false,
      }
    }
  }
</script>

<style>
  html {
    font-family: 'Open Sans', sans-serif;
    overflow-y: scroll;
    height: 100%;
  }

  body {
    margin: 0;
  }
</style>
