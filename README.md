# mock-server
> node+koa模拟数据接口

*Koa需要v7.6.0以上node版本，低于此版本请先升级node*

### 使用到的库
+ `koa`
+ `koa-router`
+ `qs`

### 执行操作
```
git clone https://github.com/daijingfeng/mock-server
cd mock-server
npm install
npm run mock
```
### postman测试接口
+ 获取列表(示例接口：`http://localhost:3000/api/getlist/0/5`)
 ![getlist](http://owio6b4eo.bkt.clouddn.com/getlist.png)
+ 获取详情(示例接口：`http://localhost:3000/api/getdetail/1`)
 ![getdetail](http://owio6b4eo.bkt.clouddn.com/getdetail.png)
+ 提交评价成功
 ![comment](http://owio6b4eo.bkt.clouddn.com/comment-ok.png)
+ 提交评价失败
 ![comment](http://owio6b4eo.bkt.clouddn.com/comment-err.png)