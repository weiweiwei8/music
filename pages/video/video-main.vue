<template>
	<scroll-view scroll-y="" enable-flex class="video_main">
		<view class="video_item" @click="handleVideo(item)" v-for="item in videowp" :key="item.id">
			<image :src="item.img" mode="widthFix"/>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		name: 'videoMain',
		props: {
			urlobj: {
				type: Object
			}
		},
		data()
		{
			return{
				videowp:[]
			}
			
			},
		watch: {
			urlobj() {
				this.getlist()
			}
		},
		methods: {
			getlist() {
				this.request({
						url: this.urlobj.url,
						data: this.urlobj.params
					})
					.then(res => {
						console.log(res)
						this.videowp=res.data.res.videowp
					})
			},
			handleVideo(item)
			{
				console.log('2')
				getApp().globalData.video=item;
				uni.navigateTo({
					url:'../video-des/video-des'
				})
			}
		},
		mounted() {
			console.log(this.urlobj);
			this.getlist()
		}
	}
</script>

<style lang="scss">
	.video_main{
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		height: calc(100vh -36px);
		.video_item{
			width:calc(33.33% - 10rpx);
			border:5rpx solid #fff;
			image{
				width:100%;
			}
		}
	}
</style>
