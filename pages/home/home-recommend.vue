<template>
	<scroll-view @scrolltolower="handleTolower" class="view" scroll-y v-if="recommends.length>0">
		<view class="recommend_wrap">
			<view class="recommend_item" v-for="item in recommends" :key="item.id">
				<image :src="item.thumb" mode="widthFix"></image>
			</view>
		</view>
		<view class="monthes_wrap">
			<view class="monthes_title">
				<view class="monthes_title_info">
					<view class="monthes_info">
						<text>{{monthes.dd}}/</text>
						{{monthes.mm}}月
					</view>
					<view class="monthes_text">{{monthes.title}}</view>
				</view>
				<view class="monthes_title_more">更多<text class="iconfont iconyoujiantou"></text></view>
			</view>
			<view class="monthes_content">
				<view class="monthes_item" v-for="item in monthes.items" :key="item.id">
					<image :src="item.thumb+item.rule.replace('$<Height>',360)" mode="aspectFill" />
				</view>
			</view>
		</view>
		<view class="hots_wrap">
			<view class="hots_title">
				<text> 热门</text>
			</view>
			<view class="hots_content">
				<view class="hots_item" v-for="item in hots" :key="item.id">
					<image :src="item.thumb" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		name: 'homeRecommend',
		data() {
			return {
				recommends: [],
				monthes: {},
				hots: [],
				params: {
					limit: 30,
					order: "hot",
					skip: 0
				},
				hasMore: true
			}
		},
		mounted() {
			this.getList();
			uni.setNavigationBarTitle({
				title:"推荐"
			})
		},
		methods: {
			getList() {
				this.request({
					url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
					data: this.params
				}).then((res) => {
					console.log(res);
					if (this.recommends.length === 0) {
						this.recommends = res.data.res.homepage[1].items;
						this.monthes = res.data.res.homepage[2];
						this.monthes.mm = this.moment(this.monthes.stime).format('MM');
						this.monthes.dd = this.moment(this.monthes.stime).format('DD');
					}
					if (res.data.res.vertical.length === 0) {
						this.hasMore = false;
					}

					this.hots = [...this.hots, ...res.data.res.vertical];
				})
			},
			handleTolower() {
				//是否加载更多
				if (this.hasMore) {
					this.params.skip += this.params.limit;
					this.getList();
				} else {
					uni.showToast({
						title: "没有数据了",
						 duration: 2000,
						icon: "none"
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.view {
		height: calc(100vh - 36px);
	}

	.recommend_wrap {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;

		.recommend_item {
			width: calc(50% - 10rpx);
			border: 5rpx solid #ffffff;

			image {
				width: 100%;
			}
		}
	}

	.monthes_wrap {
		.monthes_title {
			display: flex;
			justify-content: space-between;
			padding: 20rpx;

			.monthes_title_info {
				color: #d81e06;
				font-size: 30rpx;
				display: flex;

				.monthes_info {
					text {
						font-size: 36rpx;
						font-weight: 600;

					}
				}

				.monthes_text {
					font-size: 34rpx;
					color: #666;
					margin-left: 30rpx;
				}
			}

			.monthes_title_more {
				font-size: 30rpx;
				color: #d81e06;
				display: flex;
				align-items: center;
			}
		}

		.monthes_content {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;

			.monthes_item {
				width: calc((100% / 3) - 10rpx);
				border: 5rpx solid #fff;

				image {
					width: 100%;
				}
			}
		}
	}

	.hots_wrap {
		.hots_title {
			padding: 20rpx;

			text {
				font-size: 34rpx;
				font-weight: 600;
				border-left: 15rpx solid #d81e06;
				padding-left: 20rpx;
			}
		}

		.hots_content {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;

			.hots_item {
				width: calc((100% / 3) - 6rpx);
				border: 3rpx solid #ffffff;

				image {
					width: 100%;
				}
			}
		}
	}
</style>
