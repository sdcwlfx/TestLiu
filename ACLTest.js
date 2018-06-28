//新建帖子类及对象
var AV = require('leanengine');
var ACLPost=AV.Object.extend('ACLPost');
var aclPost=new ACLPost();
ACLPost.set('title','大家好，我是超级新星');

//新建ACL对象
var acl=new AV.ACL();
acl.setPublicReadAccess(true);
acl.setWriteAccess(AV.User.current(),true);

//
aclPost.setACL(acl);
aclPost.save().then(function(){
    console.log("save success");

}).catch(function(error){
    console.log(error);
 
});


