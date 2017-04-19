<template>
  <div id="app">
    <nav>
      <ul>
        <li :class="{ active: activeComp=='Linear' }" v-on:click="activeComp='Linear'">
          <router-link to="/linear">Linear</router-link>
        </li>
        <li :class="{ active: activeComp=='Clock' }" v-on:click="activeComp='Clock'">
          <router-link to="/">Clock</router-link>
        </li>
        <li :class="{ active: activeComp=='Stars' }" v-on:click="activeComp='Stars'">
          <router-link to="/Stars">Stars</router-link>
        </li>
      </ul>
      
      
    </nav>
    <div id="content">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    </div>

  </div>
</template>

<script>

export default {
  name: 'app',
  data(){
    return {
      activeComp: 'Stars'
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
body {
  overflow: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}
nav {
  position: absolute;
  top: 0;
  width: 100%;
  height: 50px;
  background: rgba(0, 0, 0, 0.5);
  line-height: 50px;
  display: flex;
}
ul {
  width: 100%;
}
nav li {
  float: left;
  list-style: none;
  width: 10%;
}
nav li:hover {
  background: black;
}
nav a {
  display: block;
  color: white;
  text-decoration: none;
}
nav .active {
  background: black;
}
</style>
