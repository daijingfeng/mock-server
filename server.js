const Koa = require('koa');
const Router = require('koa-router');
const qs = require('qs');
const assert = require('assert');

const app = new Koa();
const router = new Router();

/**
 * 获取列表数据
 * @param {request} page 页数
 * @param {request} limit 每页数据条数
 * @param {response} errno 返回状态码 0 ==> 返回成功  1 ==> 有错误
 * @param {response} hasMore 是否有更多数据
 */
let listData = require('./mock/list/list.js');

router.get('/api/getlist/:page/:limit', function (ctx, next) {
	
	const page = ctx.params.page;
	const limit = ctx.params.limit;
	const maxPage = listData.length / limit;
	
	// 构造返回对象
	let res = {
		errno: 0,
		data: {
			hasMore: true,
			data: []
		}
	};

	// 如果超过最大页面数
	if ((page*1 + 1) >= maxPage) {
		res.data.hasMore = false;
	}
	res.data.data = listData.slice(page*limit, page*limit + limit);
  	ctx.body = res;
});

/**
 * 获取详情数据
 * @param {request} id 商品id
 */
const detailData = require('./mock/detail/detail.js');

router.get('/api/getdetail/:id', function (ctx, next) {

	const id = ctx.params.id
	let res = {
		errno: 0,
		data: {
			data: []
		}
	}
	res.data.data = detailData;
	// todo...
	ctx.body = res;
});

/**
 * 提交评论
 * @param {request} id  用户id
 * @param {request} uid 商品id
 * @param {request} msg 评论内容
 */
router.post('/api/comment', function (ctx, next) {
	
	const params = qs.parse(ctx.req._parsedUrl.query);
	const id = params.id;
	const uid = params.uid;
	const msg = params.msg;
	if (id === undefined || uid === undefined || msg === undefined) {
		ctx.body = {
			errno: 1,
			msg: '缺少参数'
		}
	} else {
		// todo...
		ctx.body = {
			errno: 0,
			msg: '评论成功'
		}
	}
});

app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(3000);
console.log("server is running at http://localhost:3000/");