export default (params)=>
{
	uni.showLoading({
		title:"加载中"
	})
	return new Promise((resolve,reject)=>
	{
		uni.request({
			...params,
			success(res)
			{
				resolve(res);
			},
			fail(err)
			{
				reject(err);
			},
			complete()
			{
				uni.hideLoading();
			}
		})
	})
}