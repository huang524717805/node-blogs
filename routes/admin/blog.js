var Blog = require('../../models/Blog')
var BlogType = require('../../models/BlogType')
var express = require('express');
var router = express.Router();


//////列表页
router.get('/:page?', function (req, res, next) {
    //res.send('respond with a resource');
    //

    // db.Bolg.find().count((err,totalCount)=>{
    //     if(err){

    //     }
    //     else{
    //         db.Blog.find().exec((err,data)=>{
    //             if(err){

    //             }
    //             else{


    //                 /////写处理函数

    //             }
    //         })
    //     }
    // })

    var filter = {}

    var title = req.query.title
    var type = req.query.type

    if (!!title) {
        filter.title = {
            '$regex': `.*?${title}.*?`
        }
    }

    if (!!type) {
        filter.type = type
    }
    var page = Number(req.params.page) || 1;
    BlogType.dal.findByFilter({}, (typeData) => {
        Blog.dal.getListByPage(filter, page, 1, function (data) {
            data.data = data.data.map(function (item) {
                item = item.toObject() /////把item转换为js对象
                try {
                    item.typeName = "暂无分类"
                    /////对type分类数据进行筛选
                    item.typeName = typeData.filter(function (temType) {
                        return item.type == temType._id
                    })[0].name
                }
                catch (ex) {
                }

                item.id = item._id.toString() ////把属相_id赋值给id
                delete item._id ////删除原来的_id属性
                return item
            })
            data.title = "Blog内容管理"

            data.query = req.query
            res.render('admin/blog/index', data)
        })
    })

});

/////编辑页面 添加和修改在一起
router.get('/editor/:id', function (req, res, next) {
    BlogType.dal.findByFilter({}, (type_data) => {
        type = type_data
        Blog.dal.getModelById(req.params.id, (data) => {
            if (data.id) {
                // data.title = '信息编辑'
                res.render('admin/blog/editor', {
                    data: data,
                    type: type
                })
            } else {
                data = new Blog.db.Blog()
                // data.title = '信息编辑'
                res.render('admin/blog/editor', {
                    data: data,
                    type: type
                })
            }
        })
    })

});
//////编辑表单提交
router.post('/editor/:id', function (req, res, next) {
    var model = req.body;
    Blog.dal.update(req.params.id, model, true, (data) => {
        if (data) {
            //res.json(data)
            res.redirect('/admin/Blog/1');
        } else {
            res.send('err')
        }
    })
});

///////删除操作
router.post('/delete', function (req, res, next) {
    if (req.body.id) {
        Blog.dal.remove(req.body.id, (data) => {
            if (data) {
                console.log('删除成功');
            } else {
                console.log('删除失败')
            }
            res.redirect('/admin/Blog/1');
        })
    } else {
        res.redirect('/admin/Blog/1');
    }
})

module.exports = router;
