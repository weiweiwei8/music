<template>
	<view class="video_paly">
		<image :src="video.img"></image>
		<view class="video_tool">
			<view :class="[muted?'iconbofang':'iconiconfront-','iconfont']" @click="closeSound"></view>
			<view class="iconshengyin iconfont"></view>
		</view>
	  <view class="video_wrap">
	 	<video :src="video.video" :muted="muted" objectFit="fill"></video>
	  </view>
	</view>
</template>

<script>
	export default{
		data()
		{
			return{
				video:{},
				muted:false
			}
		},
		methods:{
			closeSound()
			{
				this.muted=!this.muted;
			}
		},
		onLoad()
		{
			this.video=getApp().globalData.video;
		}
	}
</script>

<style lang="scss">
	@import url("../../common/iconfont.css");
	.video_paly{
		position: relative;
		image{
			position: absolute;
			width:100vw;
			height:100vh;
			z-index:-1;
			filter: blur(20px);
		}
		.video_tool{
			height: 80rpx;
			display: flex;
			justify-content: flex-end;
			.iconfont{
				width: 80rpx;
				color: #fff;
				font-size: 50rpx;
				border-radius: 40rpx;
				background-color: rgba(0,0,0,.2);
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 15rpx;
			}
		}
		.video_wrap{
			display: flex;
			justify-content: center;
		    video{
				width:360rpx;
				height: 600rpx;
			}
		}
	}
</style>
