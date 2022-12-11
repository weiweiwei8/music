<template>
	<view class="home">
		<view class="home_title">
			<view class="title_inner">
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text"
					activeColor="#d81e06"></uni-segmented-control>
			</view>
			<view class="iconfont icontubiaoguifan-20"></view>
		</view>
		<view class="home_content" @touchstart="handletouchstart" @touchend="handletouchend">
			<view v-if="current === 0">
				<home-recommend></home-recommend>
			</view>
			<view v-if="current === 1" style="height: 100vh;">
				选项卡2的内容
			</view>
			<view v-if="current === 2" style="height: 100vh;">
				选项卡3的内容
			</view>
			<view v-if="current === 3">
				<album></album>
			</view>
		</view>
	</view>
</template>

<script>
	import homeRecommend from './home-recommend.vue'
	import album from './album.vue'
	export default {
		components:{
			homeRecommend,
			album
		},
		data() {
			return {
				items: ['推荐', '分类', '最新','专辑'],
				current: 0,
				startTime:0,
				startx:0,
				starty:0
				
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			handletouchstart(e)
			{
				this.startTime=Date.now();
				this.startx=e.changedTouches[0].clientX;
				this.starty=e.changedTouches[0].clientY;
			},
			handletouchend(e)
			{
				const end=Date.now;
				const endx=e.changedTouches[0].clientX;
				const endy=e.changedTouches[0].clientY;
				let direction='';
				//判断按下时长
				if(end-this.startTime>2000)
				{
					return ;
				}
				//判断滑动距离
				if(Math.abs(endy-this.starty)>50)
				{
					console.log('上下滑')
				}else
				{
					if(Math.abs(endx-this.startx)>50)
					{
						//滑动方向
						direction=endx>this.startx?'right':'left'
					}
				}
				console.log(direction);
				if(direction=='left'&&this.current!=3)
				{
					this.current++;
				}
				else if(direction=='right'&&this.current!=0){
					this.current--;
				}
			}
		},
	}
</script>

<style lang="scss">
	@import url("../../common/iconfont.css");
	.home{
		.home_title{
			position:relative;
			.title_inner{
				width:60%;
				margin:0 auto;
				font-size: 40rpx;
			}
			.icontubiaoguifan-20{
				position: absolute;
				top:50%;
				transform: translateY(-50%);
				right:5%
			}
		}
	}
</style>
