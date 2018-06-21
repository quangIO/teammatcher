<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Explore</router-link> |
      <!-- <router-link to="/request">Invitations</router-link> | -->
      <router-link to="/profile">Profile</router-link> |
      <a href="https://shecodes-devel.herokuapp.com/logout">Logout</a>
    </div>
    <vs-button v-if="me == null" @click="toFacebook">Login with facebook to continue</vs-button>
    <h3 v-else>Hello {{me['name']}}</h3>
    <br/>
    <br/>
    <router-view/>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        me: null
      }
    },
    methods: {
      toFacebook: function() {
        window.location.href = this.API_URL + '/login';
      },
    },
    mounted() {
      this.$vs.loading();
      Vue.axios.get(this.API_URL + '/me', {withCredentials: true}).then((res) => {
        if (res.data['code'] === 200) {
          this.me = res.data['message'];
        } else {
          this.$vs.notify({title:'Please login to continue',text:'You are not logged in',color:'danger',icon:'error'});
        }
      }).finally(() => {
        this.$vs.loading.close();
      });
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
