<template>
  <div id="block-clock">
    <canvas id="clock"></canvas>
  </div>
</template>

<script>

export default {
  name: 'app',
  data(){
    return{
      ctx: '',
      width: '',
      height: '',
      radius: 250,
      font_size: 25,
      animate: ''
    }
  },
  created(){
    this.radius = window.innerWidth>500?250:window.innerWidth*0.4;
    this.font_size = window.innerWidth>500?40:20;
  },
  mounted(){
    var clock = document.getElementById('clock');
    clock.width = document.body.clientWidth;
    clock.height = window.innerHeight;
    this.ctx = clock.getContext("2d");
    this.width = clock.width;
    this.height = clock.height;
  },
  activated(){
    this.start();
  },
  deactivated(){
    cancelAnimationFrame(this.animate);
  },
  beforeDestroy(){
    cancelAnimationFrame(this.animate);
  },
  methods: {
    drawCircle: function(){

      var ctx = this.ctx;
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(0.5*this.width, 0.5*this.height, this.radius, 0, 2*Math.PI);
      ctx.closePath();
      ctx.lineWidth = 15;
      ctx.strokeStyle = "#D3D3D3";
      ctx.stroke();

      var panelbg = ctx.createRadialGradient(0.5*this.width,0.5*this.height, 0, 0.5*this.width,0.5*this.height, this.radius);
      panelbg.addColorStop(0, "#F8F8FF");
      panelbg.addColorStop(0.95, "#F8F8FF");
      panelbg.addColorStop(1, "#808080");

      ctx.fillStyle = panelbg;
      ctx.fill();

      ctx.strokeStyle = 'black';
      
      for(var i=0; i<12; i++){
        var degree = Math.PI*(i+1)/6;
        if( (i+1)%3 == 0 ){
          var d = 0.85;
          var w = 4;
          var y = 0.5*this.height-0.72*this.radius*Math.cos(degree);
          var x = 0.5*this.width+0.72*this.radius*Math.sin(degree);
          switch(i+1){
            case 3:
              y += 15;
              break;
            case 6:
              x -= 10;
              y += 15;
              break;
            case 9:
              y += 15;
              x -= 15;
              break;
            case 12:
              y += 5;
              x -= 20;
          }
          
          ctx.font = "Bold "+this.font_size+"px Arial";
          ctx.fillStyle = 'black';
          ctx.fillText(i+1, x, y);
        }else{
          var d = 0.9
          var w = 4;
        }
        ctx.lineWidth = w;
        ctx.beginPath();
        ctx.moveTo(0.5*this.width+this.radius*Math.sin(degree), 0.5*this.height-this.radius*Math.cos(degree));
        ctx.lineTo(0.5*this.width+d*this.radius*Math.sin(degree), 0.5*this.height-d*this.radius*Math.cos(degree));
        ctx.stroke();
        ctx.closePath();

        

      }

      var d = 0.92;
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#2F4F4F';
      for(var i=0; i<72; i++){
        var degree = Math.PI*(i+1)/30;
        ctx.beginPath();
        ctx.moveTo(0.5*this.width+this.radius*Math.sin(degree), 0.5*this.height-this.radius*Math.cos(degree));
        ctx.lineTo(0.5*this.width+d*this.radius*Math.sin(degree), 0.5*this.height-d*this.radius*Math.cos(degree));
        ctx.stroke();
        ctx.closePath();
      }

      this.drawAP();
      
    },

    drawTimeH: function(h){
      var ctx = this.ctx;
      ctx.lineWidth = 7;
      ctx.strokeStyle = 'black';
      
      ctx.beginPath();
      ctx.moveTo(0.5*this.width+0.1*this.radius*Math.sin(h*Math.PI/6+Math.PI), 0.5*this.height-0.1*this.radius*Math.cos(h*Math.PI/6+Math.PI));
      ctx.lineTo(0.5*this.width+0.5*this.radius*Math.sin(h*Math.PI/6), 0.5*this.height-0.5*this.radius*Math.cos(h*Math.PI/6))
      ctx.closePath();
      ctx.stroke();

    },


    drawTimeM: function(m){
      var ctx = this.ctx;
      ctx.lineWidth = 4;
      ctx.strokeStyle = 'black';
      ctx.beginPath();
      ctx.moveTo(0.5*this.width+0.15*this.radius*Math.sin(m*Math.PI/30+Math.PI), 0.5*this.height-0.15*this.radius*Math.cos(m*Math.PI/30+Math.PI));
      ctx.lineTo(0.5*this.width+0.7*this.radius*Math.sin(m*Math.PI/30), 0.5*this.height-0.7*this.radius*Math.cos(m*Math.PI/30))
      ctx.closePath();
      ctx.stroke();

    },


    drawTimeS: function(s){
      var ctx = this.ctx;
      ctx.lineWidth = 4;
      ctx.strokeStyle = 'red';

      ctx.beginPath();
      ctx.moveTo(0.5*this.width+0.15*this.radius*Math.sin(s*Math.PI/30+Math.PI), 0.5*this.height-0.15*this.radius*Math.cos(s*Math.PI/30+Math.PI));
      ctx.lineTo(0.5*this.width+0.3*this.radius*Math.sin(s*Math.PI/30+Math.PI), 0.5*this.height-0.3*this.radius*Math.cos(s*Math.PI/30+Math.PI))
      ctx.closePath();
      ctx.stroke();

      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0.5*this.width+0.3*this.radius*Math.sin(s*Math.PI/30+Math.PI), 0.5*this.height-0.3*this.radius*Math.cos(s*Math.PI/30+Math.PI));
      ctx.lineTo(0.5*this.width+0.85*this.radius*Math.sin(s*Math.PI/30), 0.5*this.height-0.85*this.radius*Math.cos(s*Math.PI/30))
      ctx.closePath();
      ctx.stroke();

      ctx.fillStyle = 'black';
      ctx.arc(0.5*this.width, 0.5*this.height, 10, 0, 2*Math.PI);
      ctx.fill();

    },

    start: function() {
      this.animate = requestAnimationFrame(this.start);
      var date = new Date();
      var h = date.getHours();
      var m = date.getMinutes();
      var s = date.getSeconds();
      h += m/60;
      m += s/60;
      this.ctx.clearRect(0, 0, this.width, this.height);
      
      this.drawCircle();

      var ctx = this.ctx;
      ctx.shadowColor = 'grey';
      ctx.shadowBlur = 30;

      this.drawTimeH(h);
      this.drawTimeM(m);
      this.drawTimeS(s);


    },

    drawAP: function(){
      var ctx = this.ctx;
      var apbg = ctx.createRadialGradient(0.5*this.width+this.font_size*1.25+0.2*this.radius, 0.5*this.height, 0, 0.5*this.width+this.font_size*1.25+0.2*this.radius, 0.5*this.height, this.font_size*1.25);
      apbg.addColorStop(0, "white");
      apbg.addColorStop(0.7, "white");
      apbg.addColorStop(1, "#DCDCDC");

      ctx.fillStyle = apbg;
      ctx.fillRect(0.5*this.width+0.2*this.radius, 0.5*this.height-0.1*this.radius, this.font_size*2.5, this.font_size*1.6)
      ctx.strokeRect(0.5*this.width+0.2*this.radius, 0.5*this.height-0.1*this.radius, this.font_size*2.5, this.font_size*1.6);

      ctx.fillStyle = 'black';
      ctx.fillText((new Date()).getHours()>=12?' P M':' A M', 0.5*this.width+0.2*this.radius, 0.5*this.height+this.font_size*0.5)
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
}
</style>
