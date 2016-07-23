/**
 * Created by yuluo on 16/07/23.
 */
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

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

var AdminUser = require('./models/AdminUser')

AdminUser.dal.getListByPage({},1,10,function(data){
  console.log(data)
})
AdminUser.dal.findOneByFilter({user_name:"admin"},function(data){
  console.log(data)
})
// AdminUser.dal.getModel('123')
// AdminUser.dal.findByID();
// console.dir(AdminUser)

var NoteFolder = require('./models/NoteFolder')
// console.dir(NoteFolder)
// NoteFolder.dal.getModel('123')


app.listen(3001,(req,res)=>{
  console.log('服务器运行中...');
})
