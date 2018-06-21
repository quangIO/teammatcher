<template>
  <div class="team" :id="'team' + teamId">
    <vs-card actionable>
      <vs-card-header>Team #{{teamId}}</vs-card-header>
      <vs-card-body>
        <vs-list>
          <vs-list-item v-tooltip="u['intro']" v-for="u in users" :key="u['id']" vs-icon="account_box" :vs-title="u['name']">
            <read-more title="Tìm người..." v-if="u['wantTeam']" :content="u['wantTeam']"></read-more>
          </vs-list-item>
        </vs-list>
      </vs-card-body>
      <vs-card-actions>
        <vs-button v-if="likedBack" @click="requestTeam" vs-color="success" vs-type="gradient" vs-icon="done">
          Đồng ý
        </vs-button>
        <vs-button v-else-if="!liked" @click="requestTeam" vs-color="danger" vs-type="gradient" vs-icon="favorite">
          Ngỏ lời
        </vs-button>
        <vs-button v-else disabled vs-color="dark" vs-type="gradient" vs-icon="send">
          Đã gửi
        </vs-button>
      </vs-card-actions>
    </vs-card>
  </div>
</template>

<script>
  import ReadMore from "./ReadMore";

  export default {
    name: 'Team',
    components: {ReadMore},
    props: {
      teamId: Number,
      users: Array,
      liked: Boolean,
      likedBack: Boolean
    },
    methods: {
      requestTeam() {
        this.$vs.loading();
        Vue.axios.post(this.API_URL + '/like', {'team': this.teamId}, {withCredentials: true}).then((res) => {
          if (res.data['code'] === 200) {
            if (this.likedBack)
              this.$vs.notify({title:'Awesome!',text:'Connect with your teammates on Facebook',color:'success',icon:'done'});
            else
              this.$vs.notify({title:'Fingers crossed!',text:"Let's wait for their response",color:'success',icon:'done'});
          } else {
            this.$vs.notify({title:'Invalid request',text:"I am broken :(. Try to refresh the page",color:'danger',icon:'error'});
          }
          this.$eventHub.$emit("liked");
          this.$vs.loading.close();
        });
      }
    }
  };
</script>

<style>
  .team {
    padding: 5px 6px 25px;
  }
</style>