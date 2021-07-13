<template>
  <div class="container">
    <div
      :class="{'no-result':!movies.length}"
      class="inner">
      <Loader v-if="loading" />
      <div
        v-if="message"
        class="message">
        {{ message }}
      </div>
      <div
        v-else
        class="movies">
        <MovieItem
          v-for="movie in movies"
          :movie="movie"
          :key="movie.imdbID" />
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import Loader from './Loader.vue'
import MovieItem from './MovieItem.vue'
export default {
  components: { MovieItem, Loader },
  computed:{
    ...mapState('movie',['movies','message','loading'])
      // movies(){
      //     return this.$store.state.movie.movies
      // },
      // message(){
      //   return this.$store.state.movie.message
      // },
      // loading(){
      //   return  this.$store.state.movie.loading
      // }
  }

}
</script>

<style lang="scss" scoped>
.container{
  margin-top: 30px;
  .inner{
    text-align: center;
    background-color: $gray-200;
    padding: 10px 0;
    border-radius: 4px;
    &.no-result{
      padding: 70px 0;
    }
  }
  .message{
    color:$gray-400;
    font-size: 20px;
  }
}
.movies{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>