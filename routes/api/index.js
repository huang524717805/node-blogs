var Blog = require('../../models/Blog')
var BlogType = require('../../models/BlogType')
var express = require('express');
var router = express.Router();


function toObject(data){
  data = data.toObject()
  data.id = data._id
  delete data._id
  delete data._v

  if(data.img){
    if(!data.img.startsWith('http://')){
      data.img = "http://localhost:3001"+data.img
    }
  }

  if(data.content){
    /////匹配content中所有的src 修改为加上服务器地址
    var reg = new RegExp(/src="\/uploads/,'g')
    data.content = data.content.replace(reg,'src="http://localhost:3001/uploads')
  }
  return data
}
function toArray(arr){
  return arr.map(function(item){
    return toObject(item)
  })
}

/**
 * [根据分类 以分页的形式获取数据,当type参数为0时 不查询type]
 * type 分类id
 * page 可选参数页码
 * @return {[type]}              [description]
 */
router.get('/get_all_data/:type/:page?', (req, res) => {
  var filter = {}
  if (req.params.type != "0") {
    filter.type = req.params.type
  }
  var page = Number(req.params.page) || 1;
  BlogType.dal.findByFilter({}, (typeData) => {
    Blog.dal.getListByPage(filter, page, 1, function (data) {

      data.data = toArray(data.data)

      data.data = data.data.map(function (item) {
        
        try {
          item.typeName = "暂无分类"
          /////对type分类数据进行筛选
          item.typeName = typeData.filter(function (temType) {
            return item.type == temType._id
          })[0].name
        }
        catch (ex) {
        }        
        return item
      })
      res.json({ status: "y", msg: "获取数据成功", data: data })
    })
  })
})

////获取所有的分类信息
router.get('/get_types', (req, res) => {
  BlogType.dal.findByFilter({}, (typeData) => {
    typeData = toArray(typeData)
    res.json({ status: "y", msg: "获取数据成功", data: typeData })
  })
})

////根据id查询文章信息
router.get('/detail/:id', (req, res) => {
  Blog.dal.getModelById(req.params.id, (data) => {
    ////在更新的时候通过$inc的方式直接实现某一个字段的增加操作
    Blog.dal.update(req.params.id,{'$inc':{'view_times':1}},false,(res)=>{console.log(res)})
    data = toObject(data)
    res.json({ status: "y", msg: "获取数据成功", data: data })
  })
})

module.exports = router;
