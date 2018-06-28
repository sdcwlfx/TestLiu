var AV = require('leanengine');


/**
 * 一个简单的云函数定义方法
 */
AV.Cloud.define('hello', function(request) {
  return 'Hello world!';
});

