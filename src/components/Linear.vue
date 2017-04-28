<template>
		<canvas class="linear">你的浏览器版本过低，建议使用Chrome浏览器！</canvas>
</template>

<script>

export default {
	name: 'linear',
	props: {
		count: {
			type: Number,
			default: 50
		},
		speed: {
			type: Number,
			default: 3
		}
	},
	data(){
		return {
			Point: '',	//表示Point对象，会在该Vue实例化的时候初始化
			points: [],	//存储所有的point集合
			ctx: '',
			animate: '',
			status: 'paused',
			width: 1024,
			height: 768
		}
	},
	created(){
		this.initPoint();
		for(var i=0; i<this.count; i++){
			this.points.push(new this.Point);
		}
	},
	mounted(){
		var canvas = this.$el
		canvas.width = this.width;
		canvas.height = this.height;
		this.ctx = canvas.getContext("2d");

		this.move()
		this.status = 'running'
	},
	activated(){
		if (this.status !== 'running'){
			this.move();
			this.running = 'running'
		}
	},
	deactivated(){
	  cancelAnimationFrame(this.animate);
		this.running = 'paused'
	},
	beforeDestroy(){
		cancelAnimationFrame(this.animate);
		this.running = 'paused'
	},
	methods: {
		move(){
			this.animate = requestAnimationFrame(this.move);
			this.ctx.clearRect(0, 0, this.width, this.height);
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

<style scoped>
canvas.linear {
	width: 100%;
}
</style>