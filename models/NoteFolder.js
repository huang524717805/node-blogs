/**
 * Created by yuluo on 16/07/23.
 */
var db = require('./BaseModel')

//////设置模型名字
const TableName = "NoteFolder"

const dal = Object.create(db.dal)

module.exports = {dal:dal}
