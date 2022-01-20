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
  user-select: none;
  -moz-user-select: none;
  width: 100%;
  height: 100%;
}
html {
  width: 100%;
  height: 100%;
  background-color: #93979e;
}
body {
  margin: 0;
  min-width: 99%;
  min-height: 98%;
  border-style: solid;
  border-width: 10px;
  border-top-color: #b7bdc7;
  border-left-color: #93979e;
  border-right-color: #000a1c;
  border-bottom-color: #000a1c;

}
</style>
