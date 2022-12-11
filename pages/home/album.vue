<template>
	<scroll-view class="album" @scrolltolower="handleTolower" scroll-y> 
		<view class="album_swiper">
			<swiper autoplay circular indicator-dots>
				<swiper-item v-for="item in banner" :key="item.id">
					<image :src="item.thumb"></image>
				</swiper-item>
			</swiper>
		</view>
        <view class="album_list">
			<navigator class="album_item" v-for="item in album" 
			:key="item.id"
			url="../album-des/index">
				<view class="album_img">
					<image :src="item.cover" mode="aspectFill"></image>
				</view>
				<view class="album_info">
					<view class="album_name">{{item.name}}</view>
					<view class="album_desc">{{item.desc}}</view>
					<view class="album_btn">
						<view class="album_attention">+关注</view>
					</view>
				</view>
			</navigator>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		name: 'album',
		data() {
			return {
				params: {
					limit: 30,
					order: "hot",
					skip: 0
				},
				banner: [],
				album: []
			}
		},
		methods: {
			getList() {
				this.request({
					url: "http://157.122.54.189:9088/image/v1/wallpaper/album",
					data: this.params
				}).then((res) => {
					console.log(res)
					this.banner = res.data.res.banner;
					this.album = res.data.res.album;
				});
			},
			handleTolower()
			{
				
			}
		},
		mounted() {
			this.getList()
			console.log('专辑')
			uni.setNavigationBarTitle({
				title: "专辑"
			})
		}
	}
</script>

<style lang="scss">
	.album{
		height: calc(100vh - 30px);
	}
	.album_swiper
	{
		swiper{
			height: calc(750rpx / 2.3);
			swiper-item{
				image{
					width:100%;
					height: 100%;
				}
			}
		}
		
	}
	.album_list{
		padding: 10rpx;
		.album_item{
			padding:10rpx 0;
			display: flex;
			border-bottom: 1rpx solid #ccc;
			.album_img{
				flex: 1;
				image{
					width:200rpx;
					height: 200rpx;
				}
			}
			.album_info{
				flex: 2;
				padding: 0 10rpx;
				overflow: hidden;
				.album_desc{
					padding: 10rpx 0;
					font-size: 24rpx;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					
				}
				.album_name{
					font-size: 30rpx;
					font-weight: 600;
					color:#000;
					padding: 10rpx 0;
					
				}
				.album_btn{
					padding: 10rpx 0;
					display: flex;
					justify-content: flex-end;
					.album_attention{
						color: #d81e06;
						border:1rpx solid #d81e06;
						font-size:30rpx;
					}
				}
			}
		}
	}
</style>
