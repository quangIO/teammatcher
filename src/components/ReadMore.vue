<template>
  <div class="readmore-btn">
    <vs-button vs-type="border" @click="popupActivo=true">Read more</vs-button>
    <vs-popup class="holamundo" :vs-title="title" :vs-active="popupActivo" @vs-cancel="popupActivo=false">
      <p>{{content}}</p>
    </vs-popup>
  </div>
</template>

<script>
  export default {
    name: "ReadMore",
    props: {
      title: String,
      content: String
    },
    data(){
      return {
        popupActivo:false
      }
    }
  }
</script>

<style scoped>

</style>