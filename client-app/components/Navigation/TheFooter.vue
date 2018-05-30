<template>
  <div class="footer-container">
    <div :style="dynamicFooterStyle" >
      <div class="spacer"></div>
      <div class="navigation-items">
        <ul class="nav-list">
          <li class="nav-item">All Rights Reserved</li>
          <!--<li class="nav-item"><nuxt-link to="/admin">Admin</nuxt-link></li>-->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "TheFooter",
  props: {
    barColor: {
      type: String,
      required: false,
      default: 'black'
    }
  },
  computed : {
    dynamicFooterStyle() {
      return {
        width: '100%',
        position: 'absolute',
        height: '60px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: `${this.barColor}`,
        zIndex: '100',
        boxSizing: 'border-box',
        padding: '0 20px',
      };
    },
  },
};
</script>


<style scoped>

.footer-container {
  height: 30px;
  font-size: 0.9rem;
  color: white;
}

.spacer {
  flex: 1;
}

.navigation-items {
  display: block;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.nav-item {
  margin: 0 10px;
}

.nav-item a {
  text-decoration: none;
  color: white;
}

.nav-item a:hover,
.nav-item a:active,
.nav-item a.nuxt-link-active {
  color: white;
}

</style>
