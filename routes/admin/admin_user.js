var AdminUser = require('../../models/AdminUser')
var express = require('express');
var router = express.Router();

////引入crypto模块
const crypto = require('crypto')

////测试MD5加密功能
const md5 = crypto.createHash('md5')


/* GET users listing. */
router.get('/:page', function(req, res, next) {
    //res.send('respond with a resource');

    AdminUser.dal.getListByPage({}, 1, 10, function(data) {
        data.title = "管理员信息管理"
        res.render('admin/admin_user/index', data)
    })


});

router.get('/editor/:id', function(req, res, next) {
    AdminUser.dal.getModelById(req.params.id, (data) => {
        if (data.id) {
            data.title = '信息编辑'
            res.render('admin/admin_user/editor', {data:data})
        } else {
            // res.send('err')
            data = new AdminUser.db.AdminUser()
            // data = data.toObject()
            // data.id = data._id
            // delete data._id
            data.isAdd = true /////是否为新增,如果是新增 为密码添加验证规则
            data.title = '信息编辑'
            res.render('admin/admin_user/editor', {data:data})
        }
    })
});

router.post('/editor/:id', function(req, res, next) {
    var model = req.body;

    //////判断用户密码是否有输入 如果有就修改密码 没有就不对密码项做操作
    if (!!req.body.pwd.trim()) {
        model.pwd = md5.update(req.body.pwd).digest('hex').toString()
        model.is_encrypt = 1
    } else {
        delete model.pwd
    }

    AdminUser.dal.update(req.params.id, model, true, (data) => {
        if (data) {
            //res.json(data)
            res.redirect('/admin/adminUser/1');
        } else {
            res.send('err')
        }
    })
});

module.exports = router;
