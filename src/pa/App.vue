<template>
  <div id="app">
    <img src="./images/1.jpg">
    <img class="test2" >
    <img class="test3">
    <div class="test" @click="testJump">111</div>
    <div class="public-test" @click="testJump">222</div>
    <!--<router-view/>-->
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    testJump(){
      location.href = '../../bill/page/bill.html';
      setTimeout(() => {
        location.href = '../page/pa.html';
      }, 1000)
      setTimeout(() => {
        location.href = '../../presell-activity/page/pa.html';
      }, 1000)
    }

  }
}
</script>

<style scoped >
  @import "../../public/css/baseStyle.css";
  @import "./styles/1.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  .test2 {
    background: url(./images/2.jpg) no-repeat center;
    background-size: 100px 100px;
  }
  .test3 {
    background: url(./images/test/3.jpg) no-repeat center;
    background-size: 100px 100px;
  }
</style>
