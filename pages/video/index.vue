<template>
	<view class="video">
		<view class="video_title">
			<view class="title_inner">
				<uni-segmented-control :current="current" :values="items.map(v=>v.title)" @clickItem="onClickItem" styleType="text"
					activeColor="#d81e06"></uni-segmented-control>
			</view>
			<view class="iconfont icontubiaoguifan-20"></view>
		</view>
		<view class="video_content" >
			<view >
				<vidoe-main :urlobj="{url:items[current].url,params:items[current].params}"></vidoe-main>
			</view>
		</view>
	</view>
</template>

<script>
	import vidoeMain from './video-main.vue'
	import videoCategory from './video-category.vue'
	export default {
		components:{
			vidoeMain,
			videoCategory
		},
		data() {
			return {
				items: [
					{title:'推荐',url:'http://157.122.54.189:9088/videoimg/v1/videowp/featured',params:{limit:30,skip:0,order:'hot'}},
				    {title: '娱乐',url:'http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a',params:{limit:30,skip:0,order:'new'}},
					{title: '最新',url:'http://157.122.54.189:9088/videoimg/v1/videowp/videowp',params:{limit:30,skip:0,order:'hot'}}, 
					{title:'热门',url:'http://157.122.54.189:9088/videoimg/v1/videowp/videowp',params:{limit:30,skip:0,order:'new'}}],
				current: 0,
				
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			}
		}
	}
</script>

<style lang="scss">
	@import url("../../common/iconfont.css");
	.video{
		.video_title{
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
