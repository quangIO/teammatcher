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
        <vs-input v-tooltip="'Hãy cho mọi người biết kĩ năng và phong cách làm việc của bạn'"
                  vs-label-placeholder="Mình là người..." v-model="intro"/>
      </vs-col>
    </vs-row>
    <vs-row vs-w="12" vs-type="flex" vs-justify="center" vs-align="center">
      <vs-col vs-sm="10" vs-lg="10" vs-xs="12">
        <vs-input
            v-tooltip="'Bạn thích làm việc 100% nghiêm túc hay môi trường vui vẻ, bạn có muốn làm với nhưng người có mindset hay skills khác mình?'"
            vs-label-placeholder="Đang tìm người..." v-model="wantTeam"/>
      </vs-col>
    </vs-row>
    <vs-button @click="submitForm">Submit</vs-button>
    <vs-divider vs-color="danger">Danger</vs-divider>

    <vs-button @click="activePrompt = true" vs-color="danger" vs-type="border">Delete</vs-button>
    <vs-dialog @vs-cancel="email=''" vs-type="prompt" @vs-accept="deleteUser" :vs-active.sync="activePrompt">
      We will delete your account from database
      <div slot="input">
        <vs-input vs-placeholder="Email" v-model="email"/>
      </div>
    </vs-dialog>
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
        wantTeam: "",
        activePrompt: false
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
        }).finally(() => {
          this.$vs.loading.close();
        });
      },
      deleteUser() {
        this.$vs.loading();
        Vue.axios.post(this.API_URL + '/delete', {'email': this.email}, {withCredentials: true}).then((res) => {
          this.$vs.notify({
            title: 'I deleted your account',
            text: 'Thank you for using this product',
            color: 'dark',
            icon: 'done'
          });
          setTimeout(() => {
            window.location.href = 'https://shecodes.tech';
          }, 3000);
        }).finally(() => {
          this.$vs.loading.close();
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