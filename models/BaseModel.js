/**
 * Created by yuluo on 16/07/23.
 */
var db = require('../db')

var TableName = ""

/**
 * 设置页面中用于分页的中间页面的内容
 * @param  {[type]} page      [description]
 * @param  {[type]} pageCount [description]
 * @return {[type]}           [description]
 */
function getPages(page, pageCount) {
    var pages = [page]
    // 左边的第1个页码
    var left = page - 1
    // 右边的第1个页码
    var right = page + 1

    // 左右两边各加1个页码，直到页码够11个或
    // 左边到1、右边到总页数
    while (pages.length < 11 && (left >= 1 || right <= pageCount)) {
        if (left > 0) pages.unshift(left--)
        if (right <= pageCount) pages.push(right++)
    }

    return pages
}

function log(data){
  console.log(data);
}

const Dal = {
  /**
   * 保存模型
   * @param  {[object]} model    [需要保存的模型]
   * @param  {[function]} callBack [回调函数返回true或者false]
   * @return {[type]}
   */
    save: function(model, callBack) {
        //log('do save ...')
        model.save(err=>{
          if(err){
            callBack(false)
          }
          else{
            callBack(true);
          }
        })
    },
    /**
     * 分页获取数据
     * @param  {[object]} filter   [查询条件]
     * @param  {[number]} page     [当前页码]
     * @param  {[number]} pageSize [每一页的大小]
     * @param  {[function]} callBack [回调函数返回结果说明:data(返回数据的集合),pages(用于页面显示的页码数组),page(当前页码),pageCount(总页数)]
     * @return {[type]}
     */
    getListByPage: function(filter, page, pageSize,callBack) {
        //log('do page ...')
        db[TableName].find(filter).count((err, total) => {
          //log(total)
            if (err) {
                log(err)
            } else {
                /////总页数(总共有多少页)
                var pageCount = Math.ceil(total / pageSize);

                ////此处做页面范围限制
                if (page > pageCount) {
                    page = pageCount
                }
                if (page < 1) {
                    page = 1
                }
            }
            db[TableName].find(filter).skip((page-1) * pageSize).limit(pageSize).sort({
                "_id": -1
            }).exec((err, data) => {
                if (err) {
                    log(err)
                    callBack({})
                } else {
                    // log(res)
                    callBack({
                        data: data, ////table中需要遍历的数据
                        pages: getPages(page, pageCount), ////分页中显示的页码
                        page: page, /////当前页
                        pageCount: pageCount, ////总页数
                        //query: req.query
                    });
                }
            })
        })

    },
    /**
     * 根据id查询模型数据
     * @param  {[string]} id       [ObjectId]
     * @param  {[function]} callBack [回调函数,返回查询结果]
     * @return {[type]}
     */
    getModelById: function(id,callBack) {
        //log('get model by id ...')
        db[TableName].findById(id,(err,data)=>{
          if(err){
            //log(err);
            callBack({})
          }
          else{
            callBack(data)
          }
        })
    },
    /**
     * 查找模型并进行更新
     * @param  {[string]} id       [ObjectId]
     * @param  {[object]} data     [需要更新到模型中的数据]
     * @param  {[bool]} upsert   [如果不存在是否新增]
     * @param  {[function]} callBack [回调函数,返回参数为true或者false]
     * @return {[type]}          [description]
     */
    update:function(id,data,upsert,callBack){
      db[TableName].findByIdAndUpdate(id,data,{upsert:upsert},(err)=>{
        if(err){
          log(err)
          callBack(false)
        }
        else{
          callBack(true)
        }
      })
    },
    /**
     * 根据id查找并且删除模型
     * @param  {[string]} id       [ObjectId]
     * @param  {[function]} callBack [回调函数,返回参数为true或者false]
     * @return {[type]}          [description]
     */
    remove:function(id,callBack){
      db[TableName].findByIdAndRemove(id,(err)=>{
        if(err){
          log(err)
          callBack(false)
        }
        else{
          callBack(true)
        }
      })
    },

    /**
     * 根据条件筛选一条记录
     * @param  {[object]} filter   [查询条件]
     * @param  {[function]} callBack [返回查询到的数据集合]
     * @return {[type]}          [description]
     */
    findOneByFilter:function(filter,callBack){
      db[TableName].findOne(filter).exec((err,data)=>{
        if(err){
          log(err)
          callBack({})
        }
        else{
          callBack(data)
        }
      })
    },

    /**
     * 根据条件查询数据
     * @param  {[object]} filter   [查询条件]
     * @param  {[function]} callBack [回调函数,返回查询结果]
     * @return {[type]}          [description]
     */
    findByFilter:function(filter,callBack){
      db[TableName].find(filter).sort('_id',-1).exec((err,data)=>{
        if(err){
          log(err)
          callBack(data)
        }
        else{
          callBack(data)
        }
      })
    },

    /**
     * 根据条件返回指定数量的内容
     * @param  {[object]} filter   [查询条件]
     * @param  {[number]} limit    [限制数量]
     * @param  {[function]} callBack [回调函数,返回查询结果]
     * @return {[type]}          [description]
     */
    findByFilterAndLimit:function(filter,limit,callBack){
      db[TableName].find(filter).limit(limit).sort('_id',-1).exec((err,data)=>{
        if(err){
          log(err)
          callBack(data)
        }
        else{
          callBack(data)
        }
      })
    },

    /**
     * 设置model对应的模型
     * @param  {[type]} tableName [模型对应的集合名字]
     * @return {[type]}
     */
    setTableName:function(tableName){
      TableName = tableName
    }
}

module.exports = {
    dal: Dal, /////返回通用操作方法集合
    db:db     /////返回数据库模型
}
