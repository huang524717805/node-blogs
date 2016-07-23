### express使用mongoose存储数据，公用代码抽取
1. db.js文件存储数据库的访问连接以及collections信息
2. models/BaseModel.js 提取出公用的一些常用访问方法
3. 其他集合中的内容通过引入models/BaseModel.js文件,设置TableName的数据实现自己模块的一个简单继承和扩展
4. 在系统初始化的时候会检查管理员信息表中是否存在超级管理员信息,如果不存在就创建(./models/AdminUser)
