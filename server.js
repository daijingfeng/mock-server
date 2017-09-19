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
	console.log(page, limit)
	const maxPage = listData.length / limit;
	let res = {};
	res.hasMore = true;
	
	if (page === undefined || limit === undefined) {
		ctx.body = {
			errno: 1,
			msg: '缺少参数'
		}
	} else {
		res.errno = 0;
		if ((page*1 + 1) >= maxPage) {
			res.hasMore = false;
		}
		res.data = listData.slice(page*limit, page*limit + limit);
	  	ctx.body = res;
	}
});

/**
 * 获取详情数据
 * @param {request} id 商品id
 */
const detailData = require('./mock/detail/detail.js');

router.get('/api/getdetail/:id', function (ctx, next) {

	const id = ctx.params.id
	// todo...
	ctx.body = detailData;
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
	console.log(id, uid, msg);
	// todo...
	ctx.body = {
		errno: 0,
		msg: '评论成功'
	}
});

app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(3000);
console.log("server is running at localhost:3000");