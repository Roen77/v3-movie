<template>
  <div class="about">
    <div class="photo">
      <Loader
        v-if="imageLoding"
        absolute />
      <img
        :src="image"
        alt="" />
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>{{ email }}</div>
    <div>{{ blog }}</div>
    <div>{{ phone }}</div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import Loader from '../components/Loader.vue'
export default {
  components: { Loader },
  data() {
    return {
      imageLoding: true
    }
  },
  computed:{
    ...mapState('about',[
      'image',
      'name',
      'email',
      'blog',
      'phone'
    ]),
    // image(){
    //   return this.$store.state.about.image
    // },
    // name(){
    //   return this.$store.state.about.name
    // },
    // blog(){
    //   return this.$store.state.about.blog
    // },
    //  email(){
    //   return this.$store.state.about.email
    // },
    // phone(){
    //   return this.$store.state.about.phone 
    // },

  },
  mounted(){
  this.init()
  },
  methods: {
    async init() {
      await this.$loadImage(this.image)
      this.imageLoding=false
    }
  },

}
</script>

<style lang="scss" scoped>
.about{
  text-align: center;
  .photo{
    position: relative;
    width: 250px;
    height: 250px;
    margin: 40px auto 20px;
    padding: 30px;
    border-radius: 50%;
    box-sizing: border-box;
    border: 10px solid $gray-300;
    background-color: $gray-200;
    overflow: hidden;
    img{
      width: 100%;
    }
  }
  .name{
    font-size: 40px;
    margin-bottom: 20px;
    font-family: 'Osworld',sans-serif;
  }
}
</style>