<template>
  <div class="center content">
    <p>Làm ơn dành 2 phút để hoàn thiện hồ sơ này. Hãy kiểm tra tên bạn đã nhập đúng, cũng như giới thiệu về bản thân để
      tìm đồng đội dễ hơn.</p>
    <vs-row vs-w="12" vs-type="flex" vs-justify="center" vs-align="center">
      <vs-col vs-sm="5" vs-lg="5" vs-xs="12">
        <vs-input vs-label-placeholder="Name" v-model="name"/>
      </vs-col>
      <vs-col vs-sm="5" vs-lg="5" vs-xs="12">
        <vs-input disabled="true" vs-type="email" vs-label-placeholder="email (hidden)" v-model="email"/>
      </vs-col>
    </vs-row>
    <vs-row vs-w="12" vs-type="flex" vs-justify="center" vs-align="center">
      <vs-col vs-sm="10" vs-lg="10" vs-xs="12">
        <vs-input v-tooltip="'Hãy cho mọi người biết kĩ năng và phong cách làm việc của bạn'" vs-label-placeholder="Mình là người..." v-model="intro"/>
      </vs-col>
    </vs-row>
    <vs-row vs-w="12" vs-type="flex" vs-justify="center" vs-align="center">
      <vs-col vs-sm="10" vs-lg="10" vs-xs="12">
        <vs-input v-tooltip="'Bạn thích làm việc formally hay informally, bạn có muốn làm việc với nhưng người có mindset hay skills khác mình?'" vs-label-placeholder="Đang tìm người..." v-model="wantTeam"/>
      </vs-col>
    </vs-row>
    <vs-button @click="submitForm">Submit</vs-button>
  </div>
</template>

<script>
  export default {
    name: "Profile",
    data() {
      return {
        name: "",
        email: "",
        intro: "",
        wantTeam: ""
      };
    },
    methods: {
      submitForm() {
        this.$vs.loading();
        Vue.axios.post(this.API_URL + '/update', {
          'name': this.name,
          'intro': this.intro,
          'wantTeam': this.wantTeam
        }, {withCredentials: true}).then((res) => {
          this.$vs.loading.close();
          if (res.data['code'] === 200) {
            this.$vs.notify({title: 'Update succeeded', text: 'Thanks', color: 'success'});
          } else {
            this.$vs.notify({
              title: 'Cannot submit form',
              text: 'You are not logged in',
              color: 'danger',
              icon: 'error'
            })
          }
        });
      }
    },
    beforeMount() {
      console.log('mounted');
      Vue.axios.get(this.API_URL + '/me', {withCredentials: true}).then((res) => {
        if (res.data['code'] === 200) {
          let me = res.data['message'];
          this.name = me['name'];
          this.intro = me['intro'] || "";
          this.wantTeam = me['wantTeam'] || "";
        } else {
          window.location.href = this.API_URL + '/login';
        }
      });
    }
  }
</script>

<style scoped>

</style>