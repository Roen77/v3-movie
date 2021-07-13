<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div
        v-for="nav in navigations"
        :key="nav.name"
        class="nav-item">
        <RouterLink
          :class="{active:isMatch(nav.path)}"
          :to="nav.href"
          active-class="active"
          class="nav-link">
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
    <div
      class="user"
      @click="toAbout">
      <img
        :src="image"
        :alt="name" />
    </div>
  </header>
</template>

<script>
import {mapState} from 'vuex';
import Logo from './Logo.vue'
export default {
    components:{
        Logo
    },
    computed:{
      ...mapState('about',['image,name'])
      // image(){
      //   return this.$store.state.about.image
      // },
      // name(){
      //   return this.$store.state.about.name
      // },
    },
    data() {
        return {
            navigations: [
                {
                    name:'Search',
                    href:'/'
                },
                {
                    name:'Movie',
                    href:'/movie',
                    // /movie
                    path:/^\/movie/
                },
                {
                    name:'About',
                    href:'/about'
                },
            ]
        }
    },
    methods: {
      isMatch(path) {
        if(!path) return false
        return path.test(this.$route.fullPath)
      },
      toAbout(){
        this.$router.push('/about')
      }
    },

}
</script>

<style lang="scss" scoped>
header{
  position: relative;
    display: flex;
    align-items: center;
    height: 70px;
    padding: 0 40px;
    .logo{
        margin-right: 40px;
    }
    .user{
      width: 40px;
      height: 40px;
      padding: 6px;
      box-sizing: border-box;
      border-radius: 50%;
      background-color: $gray-200;
      overflow: hidden;
      cursor: pointer;
      top:0;
      position: absolute;
      bottom:0;
      right: 40px;
      margin: auto;
      &:hover{
        background-color: darken($gray-200, 10%);
      }
      img{
        width: 100%;
      }
    }
    @include media-breakpoint-down(sm){
      .nav{
        display: none;
      }
    }
}
</style>