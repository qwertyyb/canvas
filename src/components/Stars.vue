<template>
	<div id="block-stars">
		<canvas id="stars">你的浏览器不支持canvas，建议使用Chrome浏览器</canvas>
	</div>
</template>

<style>
	
</style>

<script>

export default {
	name: 'stars',
	data(){
		return {
			ctx: '',

			width: window.innerWidth,
			height: window.innerHeight
		}
	},
	mounted(){
		var stars = document.querySelector("#stars");
		stars.width = this.width;
		stars.height = this.height;
		var ctx = stars.getContext("2d");
		this.ctx = ctx;
		this.drawSky();
	},
	methods: {
		drawSky(){
			var ctx = this.ctx;
			var skyBg = ctx.createLinearGradient(0.5*this.width, 0, 0.5*this.width, this.height);
			skyBg.addColorStop(0, "rgba(0, 0, 0, 1)")
			skyBg.addColorStop(1, "rgba(50, 50, 50, 1)")
			ctx.fillStyle = skyBg;
			ctx.fillRect(0, 0, this.width, this.height);

		}
	}

}
</script>