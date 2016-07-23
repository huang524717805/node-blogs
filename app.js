/**
 * Created by yuluo on 16/07/23.
 */
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

////引入arttemplate模板
var template = require('art-template');
template.config('base', '');
template.config('extname', '.html');
app.engine('.html', template.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//////kindeditor测试部分内容
app.use('/',require('./routes/common/kindeditor/demo'));
/////kindeditor文件上传部分代码
app.use('/common/kindeditor', require('./routes/common/kindeditor/index'));

/**
 * 初始化项目的一些基础目录结构
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function initApp(req, res, next) {
    /////判断目录是否存在
    fs.exists('./public/uploads', function (d) {
        if (d) {
            console.log('上传目录已存在');
            next();
        }
        else {
            /////创建一个在项目根目录中创建一个notes目录
            fs.mkdirSync('./public/uploads');
            console.log('初始化上传目录完成');
            next();
        }
    })
}

/**
 * 通过此方法判断是访问的管理后台目录,在此处做用户是否登录的权限判断
 * [all description]
 * @param  {[type]} '/admin/*'    [description]
 * @param  {[type]} (req,res,next [description]
 * @return {[type]}               [description]
 */
app.all('/admin/*',(req,res,next)=>{
  console.log('这里访问的是管理后台...')
  next()
})

app.get('/',initApp,(req,res)=>{
  res.send('app启动');
  //res.redirect('/student/list/1');
})
app.use('/common',require('./routes/common/common'))

app.use('/admin/adminUser/',require('./routes/admin/admin_user'))



// var AdminUser = require('./models/AdminUser')

// AdminUser.dal.getListByPage({},1,10,function(data){
//   console.log(data)
// })
// AdminUser.dal.findOneByFilter({user_name:"admin"},function(data){
//   console.log(data)
// })
// AdminUser.dal.getModel('123')
// AdminUser.dal.findByID();
// console.dir(AdminUser)

// var NoteFolder = require('./models/NoteFolder')
// console.dir(NoteFolder)
// NoteFolder.dal.getModel('123')


app.listen(3001,(req,res)=>{
  console.log('服务器运行中...');
})
