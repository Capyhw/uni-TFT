export const _http = function(url, method = 'GET', baseUrl = 'https://game.gtimg.cn/images/lol/act', data = {}) {
	return new Promise((reslove, reject) => {
		uni.request({
			url: baseUrl + url,
			method,
			data,

			success: (res) => {
				reslove(res.data)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}

export const _get = function(url, data = {}) {
	return _http(url, 'GET', data)
}

export const _post = function(url, data = {}) {
	return _http(url, 'POST', data)
}
