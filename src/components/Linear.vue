<template>
	<div id="block-linear">
		<canvas id="linear">你的浏览器版本过低，建议使用Chrome浏览器！</canvas>
	</div>
</template>

<script>

export default {
	name: 'linear',
	data(){
		return {
			Point: '',
			points: [],
			speed: 5,
			ctx: '',
			count: 50,
			animate: ''
		}
	},
	created(){
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.count = (this.width*this.height)/8000;

		this.initPoint();
		for(var i=0; i<this.count; i++){
			this.points.push(new this.Point);
		}
	},
	mounted(){
		var canvas = document.querySelector("#linear");
		canvas.width = this.width;
		canvas.height = this.height;
		this.ctx = canvas.getContext("2d");
		
	},
	activated(){
	  this.move();
	},
	deactivated(){
	  cancelAnimationFrame(this.animate);
	},
	beforeDestroy(){
		cancelAnimationFrame(this.animate);
	},
	methods: {
		move(){
			this.animate = requestAnimationFrame(this.move);
			this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
			for(var i=0; i<this.points.length; i++){
				this.points[i].move();
				this.points[i].draw(this.ctx);
				for(var j=i; j<this.points.length; j++){
					this.points[i].drawLine(this.points[j], this.ctx);
				}
			}
		},
		initPoint(){
			var that = this;
			this.Point = function(){
				this.x = Math.random()*window.innerWidth;
				this.y = Math.random()*window.innerHeight;
				this.sx = (Math.random()-0.5)*that.speed;
				this.sy = (Math.random()-0.5)*that.speed;
				this.r = Math.random()*3;
			}
			this.Point.prototype.draw = function(ctx) {
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
				ctx.closePath();
				ctx.fillStyle = 'grey';
				ctx.fill();
			};
			this.Point.prototype.move = function() {
				this.x += this.sx;
				this.y += this.sy;
				if(this.x<0 || this.x>window.innerWidth){
					this.sx = 0 - this.sx;
				}
				if(this.y<0 || this.y>window.innerHeight){
					this.sy = 0 - this.sy;
				}
			};
			this.Point.prototype.drawLine = function(point, ctx) {
				var x = point.x - this.x;
				var y = point.y - this.y;
				var d = Math.sqrt( x*x + y*y );
				if( d < 150){
					var a = 1 - d/150;
					ctx.beginPath();
					ctx.moveTo(this.x, this.y);
					ctx.lineTo(point.x, point.y);
					ctx.strokeStyle = 'rgba(177, 177, 177, '+a+')';
					ctx.stroke();
				}
			};
		},


	}
}

</script>

<style>
	
</style>