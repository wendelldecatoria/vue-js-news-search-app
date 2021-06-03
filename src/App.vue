<template>
  <NewsComponent />
</template>

<script>
import NewsComponent from './components/News/Index.vue'

export default {
  name: 'App',
  components: {
    NewsComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #CCCCCC;
  margin: 0px;
  padding: 0px;
}
</style>
