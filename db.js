/**
 * Created by yuluo on 16/07/23.
 */
////引入mongoose模块
var db = require('mongoose');

//// 链接数据库 mongodb 协议, localhost 主机ip, student_db 数据库名称
db.connect('mongodb://localhost/base_db');


////管理员信息
var AdminUser = db.model('admin_user',{
    name:{type:String,default:""},
    user_name:{type:String,required:true},
    pwd:{type:String,default:""},
    is_encrypt:{type:Number,default:1},
    mobile:{type:String,default:""},
    remarks:{type:String,default:""},
    avatar:{type:String,default:""},
    create_time:{type:Date,default:Date.now},
    updated_time:{type:Date,default:Date.now}
})

var NoteFolder = db.model('note_folder',{
  name:{type:String,required:true},
  remarks:{type:String,default:""},
  create_time:{type:Date,default:Date.now},
  updated_time:{type:Date,default:Date.now}
})

var Note = db.model('note',{
  content:{type:String,default:""},
  create_time:{type:Date,default:Date.now},
  updated_time:{type:Date,default:Date.now},
  type:{type:'ObjectId',ref:NoteFolder}
})

/////模块导出
module.exports = {
    AdminUser:AdminUser
}
