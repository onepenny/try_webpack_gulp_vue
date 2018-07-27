<template>
  <div id="app">
    <img src="./images/1.jpg">
    <img src="./images/2.jpg">
    <img class="test3">
    <div class=".test">111</div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped >
  @import "./styles/1.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  .test3 {
    background: url(./images/3.jpg) no-repeat center;
    background-size: 100px 100px;
  }
</style>
