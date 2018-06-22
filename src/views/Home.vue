<template>
  <div class="home content">
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
        <h1>Welcome to SheCodes's team matcher</h1>
      </vs-col>
    </vs-row>
    <br/>
    <vs-row vs-w="12" vs-type="flex" vs-justify="center">
      <vs-col v-for="col in teams" :key="col['id']" vs-sm="6" vs-lg="4" vs-xs="12">
        <team :likedBack="likedBacks[col['id']]" :liked="likedTeams[col['id']]" :team-id="col['id']" :users="col['members']"></team>
      </vs-col>
    </vs-row>
    <vs-button vs-color="success" vs-type="gradient" vs-icon="done">
      Đồng ý
    </vs-button>
  </div>
</template>
<style>
  .content {
    padding: 20px;
  }
</style>
<script>
  import Team from "../components/Team";
  import ReadMore from "../components/ReadMore";

  export default {
    components: {ReadMore, Team},
    data() {
      return {
        active: false,
        actives: 2,
        me: null,
        teams: [],
        likedTeams: [],
        likedBacks: []
      };
    },
    methods: {
      toFacebook: function() {
        console.log("to facebook");
        window.location.href = this.API_URL + '/login';
      },
      updateTeams: function () {
        Vue.axios.get(this.API_URL + '/teams', {withCredentials: true}).then((res) => {
          this.teams = res.data; // res.data.reduce((rows, key, index) => (index % 4 === 0 ? rows.push([key]) : rows[rows.length-1].push(key)) && rows, []);
        });
      },
      updateLikedTeams: function() {
        console.log("update likedTeams");
        this.likedTeams.splice(0); // fail-safe
        Vue.axios.get(this.API_URL + '/sends', {withCredentials: true}).then((res) => {
          for (let team of res.data['message']) {
            this.$set(this.likedTeams, team, true);
          }
        });
      },
      updateLikedBack: function () {
        console.log("update likedBack");
        this.likedBacks.splice(0);
        Vue.axios.get(this.API_URL + '/receives', {withCredentials: true}).then((res) => {
          for (let team of res.data['message']) {
            this.$set(this.likedBacks, team, true);
          }
        });
      }
    },
    beforeMount() {
      this.updateTeams();
      this.updateLikedTeams();
      this.updateLikedBack();
    },
    created() {
      this.$eventHub.$on('liked', this.updateLikedTeams);
      this.$eventHub.$on('liked', this.updateTeams);
      this.$eventHub.$on('liked', this.updateLikedBack);
    },
    beforeDestroy() {
      this.$eventHub.$off('liked', this.updateLikedTeams);
      this.$eventHub.$off('liked', this.updateTeams);
      this.$eventHub.$off('liked', this.updateLikedBack);
    }

  }
</script>