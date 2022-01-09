<template>
  <div id="app">
    <Navbar />
    <FieldContainer />
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import FieldContainer from './components/FieldContainer'

export default {
  name: 'App',
  components: {
    FieldContainer,
    Navbar
  },
  created () {
    this.$store.commit('generateMatrix', { rows: 10, columns: 10, mines: 20 })
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
  margin-top: 60px;
  user-select: none;
  -moz-user-select: none;
}
</style>
