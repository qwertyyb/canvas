<template>
  <div id="app">
    <div class="background">
      <Linear :count="linear_count"></Linear>
    </div>
    <nav>
      <ul>
        <li>
          <Clock></Clock>
        </li>
      </ul>
    </nav>
      
      
    </nav>
    <div id="content">
      
      
    </div>

  </div>
</template>

<script>
import Clock from '@/components/Clock'
import Linear from '@/components/Linear'

export default {
  name: 'app',
  data(){
    return {
      linear_count: 123,
      activeComp: 'Clock'
    }
  },
  created() {
    this.linear_count = (window.innerWidth * window.innerHeight) / 7500
  },
  components: { Clock, Linear }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
html, body {
  height: 100%;
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
  width: 100%;
  height: 100%;
}
div.background {
  position: absolute;
  width: 100%;
  height: 100%;
}
nav {
  position: absolute;
  width: 100%;
  height: 300px;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
}
ul {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin: auto;
}
nav li {
  list-style: none;
  max-width: 250px;
  flex: 1;
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
