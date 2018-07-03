'use strict';
var router = require('express').Router();
var AV = require('leanengine');

//声明创建一个数据库表，并返回该表（类）AV.Object.extend（）方法一定要放在全局变量，否则会造成堆栈溢出
var Todo = AV.Object.extend('Todo');//对象拓展‘Todo’对应DB中Todo类（表）
var ACLPost=AV.Object.extend('ACLPost');


// 查询 Todo 列表，并将查询结果results以todos为名传给views中todos.ejs
router.get('/', function(req, res, next) {
  var query = new AV.Query(Todo);//创建查询
  query.descending('createdAt');//createAt递减排序

  query.find().then(function(results) {//results为查询结果，以todos为名
    res.render('todos', {//调用views中todos.ejs
      title: 'TODO 列表',
      todos: results
    });
  }, function(err) {
    if (err.code === 101) {
      // 该错误的信息为：{ code: 101, message: 'Class or object doesn\'t exists.' }，说明 Todo 数据表还未创建，所以返回空的 Todo 列表。
      // 具体的错误代码详见：https://leancloud.cn/docs/error_code.html
      res.render('todos', {
        title: 'TODO 列表',
        todos: []
      });
    } else {
      next(err);
    }
  }).catch(next);
});

// 新增 Todo 项目
router.post('/', function(req, res, next) {
  var content = req.body.content;//获取输入内容
  var todo = new Todo();//新建表Todo的一个对象
  todo.set('content', content);//保存内容对象到表Todo的content列,若无此字段，自动添加，每保存一次添加一行记录，可在leancloud平台存储的Todo表中查看
  todo.save().then(function(todo) {
    //成功保存后执行下面逻辑
    res.redirect('/todos');//重新运行此页面达刷新效果
  }).catch(next);
});


//新建一条帖子
var aclPost=new ACLPost();
aclPost.set('title','大家好，我是三井寿');

//新建ACL对象
var acl=new AV.ACL();
acl.setPublicReadAccess(true);
acl.setPublicWriteAccess(false);

//规定该帖子权限
aclPost.setACL(acl);
aclPost.save().then(function(){
    console.log("save success");

}).catch(function(error){
    console.log(error);
 
});

module.exports = router;
